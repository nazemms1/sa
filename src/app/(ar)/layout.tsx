import { RootShell, viewportConfig } from "@/components/root-shell";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

export const viewport = viewportConfig;
export const metadata = buildMetadata("ar");

export default function ArabicRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="ar">{children}</RootShell>;
}
