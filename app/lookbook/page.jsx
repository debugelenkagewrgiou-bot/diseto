
import Lookbook from "@/components/lookbook";
import { Navigation } from "@/components/navigation";

export const metadata = {
  title: "Lookbook | DiSeto",
  description:
    "Ανακαλύψτε επιλεγμένες δημιουργίες κουζίνας, ντουλάπες και επαγγελματικούς χώρους από τη DiSeto.",
};

export default function LookbookPage() {
  return (
    <main>
        <Navigation/>

      <Lookbook />
    </main>
  );
}
