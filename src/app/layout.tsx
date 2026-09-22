import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/context/language-context";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

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
  other: {
    "color-scheme": "light",
    "supported-color-schemes": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="h-full scroll-smooth light"
      style={{ colorScheme: "light" }}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body
        className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased"
        style={{ colorScheme: "light" }}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

