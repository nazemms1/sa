import type { Viewport } from "next";
import { LanguageProvider } from "@/context/language-context";
import { ScrollVideo } from "@/components/scroll-video";
import { SplashScreen } from "@/components/splash-screen";
import { tajawal, outfit } from "@/lib/fonts";
import type { Lang } from "@/lib/seo";

/**
 * Runs while the HTML is parsed, before the first paint: visitors who already
 * saw the intro in this session never get a flash of it. Key must match
 * SPLASH_SESSION_KEY in components/splash-screen.tsx.
 */
const splashInitScript = `(function(){try{if(sessionStorage.getItem("sa_logistics_splash_seen")==="1")document.documentElement.setAttribute("data-splash","hidden")}catch(e){}})()`;

export const viewportConfig: Viewport = {
  themeColor: "#f8fafc",
  // "only light" (not just "light") is the form that tells a browser it must not
  // force a dark theme onto the page, as Samsung Internet and Chrome do on
  // phones with dark mode enabled.
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
  // Lets fixed UI reach under the notch, where `env(safe-area-inset-*)` keeps
  // the content itself clear of it.
  viewportFit: "cover",
};

/** Shared <html>/<body> for both language roots (`/` and `/en`). */
export function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${tajawal.variable} ${outfit.variable} h-full scroll-smooth light`}
      style={{ colorScheme: "only light" }}
      suppressHydrationWarning
    >
      <head>
        <meta name="supported-color-schemes" content="light" />
        <script dangerouslySetInnerHTML={{ __html: splashInitScript }} />
        <noscript>
          {/* Nothing can dismiss the intro without JS, so never show it */}
          <style>{`#splash-screen{display:none!important}body{overflow:auto!important}`}</style>
        </noscript>
      </head>
      <body
        className="min-h-full flex flex-col text-slate-900 font-sans antialiased"
        style={{ colorScheme: "only light" }}
      >
        <LanguageProvider initialLang={lang}>
          {/* Scroll-driven background video */}
          <ScrollVideo />

          <div className="relative z-10 flex flex-col min-h-full">{children}</div>

          {/* Intro overlay, once per browser session */}
          <SplashScreen />
        </LanguageProvider>
      </body>
    </html>
  );
}
