import PhotoGallery from "@/components/photogallery";

export const metadata = {
  title: "Latest Photos | DISETO",
  description:
    "Οι τελευταίες φωτογραφίες από τη δουλειά μας σε κουζίνες, ντουλάπες και πόρτες.",
};

export default function LatestPhotosPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] pt-20">
      <PhotoGallery showFilters />
    </main>
  );
}