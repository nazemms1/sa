import type { Metadata } from "next";
import { LanguageProvider } from "@/context/language-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "S.A. LOGISTICS | الشحن اللوجستي والتخليص الجمركي من الصين إلى سوريا",
  description:
    "شركة S.A. LOGISTICS المتخصصة في الشحن الجوي والبحري والتخليص الجمركي من الصين إلى سوريا. مستودعات في غوانزو وإيوا، وتخليص مباشر بموانئ اللاذقية وطرطوس ودمشق.",
  keywords: [
    "شحن من الصين الى سوريا",
    "تخليص جمركي اللاذقية",
    "شحن بحري دمشق",
    "مستودعات إيوا وغوانزو",
    "SA LOGISTICS",
    "العطل الرسمية بالصين 2026",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
