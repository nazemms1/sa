import { RootShell, viewportConfig } from "@/components/root-shell";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

export const viewport = viewportConfig;
export const metadata = buildMetadata("en");

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
