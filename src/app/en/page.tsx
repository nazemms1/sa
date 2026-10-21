import { HomePage } from "@/components/home-page";
import { JsonLd } from "@/components/json-ld";

export default function Page() {
  return (
    <>
      <JsonLd lang="en" />
      <HomePage />
    </>
  );
}
