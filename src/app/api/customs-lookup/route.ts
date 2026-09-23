import { NextRequest, NextResponse } from "next/server";

export interface LiveCustomsFee {
  label: string;
  value: string;
}

export interface LiveCustomsItem {
  code: string;
  title: string;
  chapter: string;
  status: string;
  statusType: "allowed" | "banned" | "restricted" | "unknown";
  unitType: string;
  fixedFeeAmount?: number;
  fixedFeeUnit?: string;
  percentageTotal?: number;
  fees: LiveCustomsFee[];
  notes: string;
}

export interface LiveCustomsResponse {
  query: string;
  type: string;
  totalResults: number;
  items: LiveCustomsItem[];
  sourceUrl: string;
  timestamp: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQ = searchParams.get("q") || "";
  const query = rawQ.trim();
  const type = searchParams.get("type") === "export" ? "export" : "import";

  if (!query) {
    return NextResponse.json(
      { error: "يرجى إدخال رمز بند جمركي أو اسم المادة" },
      { status: 400 }
    );
  }

  const targetUrl = `https://hs-exp.net/hs_customs_search.php?q=${encodeURIComponent(query)}&type=${type}&ch=`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "ar,en-US;q=0.9,en;q=0.8",
      },
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`خطأ في استجابة خادم الجمارك: ${response.status}`);
    }

    const html = await response.text();

    // Check if empty results
    if (html.includes("لا توجد نتائج") || html.includes("class=\"empty\"")) {
      return NextResponse.json({
        query,
        type,
        totalResults: 0,
        items: [],
        sourceUrl: targetUrl,
        timestamp: new Date().toISOString(),
      });
    }

    // Extract default or global chapter title if present
    let defaultChapter = "";
    const chapterMatch = html.match(/<div class="ch-hd">\s*<h2>\s*<span>(.*?)<\/span>\s*(.*?)<\/h2>/);
    if (chapterMatch) {
      defaultChapter = `${chapterMatch[1].replace(/<[^>]+>/g, "").trim()} - ${chapterMatch[2].replace(/<[^>]+>/g, "").trim()}`;
    }

    // Split cards
    const rawParts = html.split('<div class="hs-card">');
    rawParts.shift(); // Remove content before first card

    const items: LiveCustomsItem[] = [];

    for (const part of rawParts) {
      const cardContent = part.split('<!-- PAGINATION -->')[0].split('<div class="ch-block">')[0];

      // Code
      const codeMatch = cardContent.match(/كود HS:\s*([0-9]+)/);
      const code = codeMatch ? codeMatch[1].trim() : query;

      // Title
      const titleMatch = cardContent.match(/<div class="card-title">([\s\S]*?)<\/div>/);
      let title = "";
      if (titleMatch) {
        title = titleMatch[1]
          .replace(/<small>[\s\S]*?<\/small>/g, "")
          .replace(/<[^>]+>/g, "")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/\s+/g, " ")
          .trim();
      }

      // Status
      const permMatch = cardContent.match(/<span class="pm"[^>]*>([\s\S]*?)<\/span>/);
      const statusText = permMatch
        ? permMatch[1].replace(/<[^>]+>/g, "").trim()
        : "✅ مسموح";

      let statusType: "allowed" | "banned" | "restricted" | "unknown" = "allowed";
      if (statusText.includes("ممنوع") || statusText.includes("حظر")) {
        statusType = "banned";
      } else if (statusText.includes("مقيد") || statusText.includes("موافقة") || statusText.includes("حجر")) {
        statusType = "restricted";
      }

      // Fees
      const fees: LiveCustomsFee[] = [];
      const feeRegex = /<div class="fb[^"]*">\s*<label>([\s\S]*?)<\/label>\s*<div class="v"[^>]*>([\s\S]*?)<\/div>/g;
      let fMatch;

      let unitType = "وزن";
      let fixedFeeAmount: number | undefined;
      let fixedFeeUnit: string | undefined;
      let percentageTotal: number | undefined;

      while ((fMatch = feeRegex.exec(cardContent)) !== null) {
        const rawLabel = fMatch[1].replace(/<[^>]+>/g, "").trim();
        const rawValue = fMatch[2]
          .replace(/<[^>]+>/g, " ")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/\s+/g, " ")
          .trim();

        fees.push({ label: rawLabel, value: rawValue });

        if (rawLabel.includes("نوع الوحدة")) {
          unitType = rawValue;
        } else if (rawLabel.includes("رسوم الاستيراد") || rawLabel.includes("رسم الاستيراد")) {
          const numMatch = rawValue.match(/([0-9.]+)/);
          if (numMatch) {
            fixedFeeAmount = parseFloat(numMatch[1]);
            fixedFeeUnit = rawLabel.includes("/طن") ? "طن" : "وحدة";
          }
        } else if (rawLabel.includes("من القيمة") || rawLabel.includes("سلفة مالية + رسم انفاق")) {
          const numMatch = rawValue.match(/([0-9.]+)/);
          if (numMatch) {
            percentageTotal = parseFloat(numMatch[1]);
          }
        }
      }

      // Fallback calculation for percentage total if not in a single composite label
      if (percentageTotal === undefined) {
        let sum = 0;
        let foundAny = false;
        for (const f of fees) {
          if (f.label.includes("سلفة") || f.label.includes("انفاق") || f.label.includes("جمرك")) {
            const m = f.value.match(/([0-9.]+)/);
            if (m) {
              sum += parseFloat(m[1]);
              foundAny = true;
            }
          }
        }
        if (foundAny) percentageTotal = sum;
      }

      // Notes & Requirements
      const noteMatch = cardContent.match(/<div class="ne"><p[^>]*>([\s\S]*?)<\/p><\/div>/);
      let notes = "";
      if (noteMatch) {
        notes = noteMatch[1]
          .replace(/<[^>]+>/g, "")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/\s+/g, " ")
          .trim();
      }

      items.push({
        code,
        title: title || code,
        chapter: defaultChapter || `الفصل الجمركي ${code.slice(0, 2)}`,
        status: statusText,
        statusType,
        unitType,
        fixedFeeAmount,
        fixedFeeUnit: fixedFeeUnit || "طن",
        percentageTotal: percentageTotal !== undefined ? percentageTotal : 0,
        fees,
        notes,
      });
    }

    return NextResponse.json({
      query,
      type,
      totalResults: items.length,
      items,
      sourceUrl: targetUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Live Customs Search Error:", error);
    return NextResponse.json(
      {
        error: "تعذر الاتصال بقاعدة بيانات الجمارك الرسمية حالياً. يمكنك التحقق من الرابط المباشر.",
        sourceUrl: targetUrl,
        details: error instanceof Error ? error.message : "Network error",
      },
      { status: 502 }
    );
  }
}
