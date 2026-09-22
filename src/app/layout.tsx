import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/context/language-context";
import { ScrollFrames } from "@/components/scroll-frames";
import { SplashScreen } from "@/components/splash-screen";
import "./globals.css";

/**
 * Runs while the HTML is parsed, before the first paint: visitors who already
 * saw the intro in this session never get a flash of it. Key must match
 * SPLASH_SESSION_KEY in components/splash-screen.tsx.
 */
const splashInitScript = `(function(){try{if(sessionStorage.getItem("sa_logistics_splash_seen")==="1")document.documentElement.setAttribute("data-splash","hidden")}catch(e){}})()`;

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  // Lets fixed UI reach under the notch, where `env(safe-area-inset-*)` keeps
  // the content itself clear of it.
  viewportFit: "cover",
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
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <script dangerouslySetInnerHTML={{ __html: splashInitScript }} />
        <noscript>
          {/* Nothing can dismiss the intro without JS, so never show it */}
          <style>{`#splash-screen{display:none!important}body{overflow:auto!important}`}</style>
        </noscript>
      </head>
      <body
        className="min-h-full flex flex-col text-slate-900 font-sans antialiased"
        style={{ colorScheme: "light" }}
      >
        <LanguageProvider>
          {/* Scroll-driven clip behind every section of the site */}
          <ScrollFrames />

          <div className="relative z-10 flex flex-col min-h-full">{children}</div>

          {/* Intro overlay, once per browser session */}
          <SplashScreen />
        </LanguageProvider>
      </body>
    </html>
  );
}

