import { Benefits, BrandCarousel, Hero, Services } from "@/components";

export default function HomePage() {
  return (
    <main className="relative bg-white min-h-screen ">
      <Hero />
      <div className="py-10 md:py-16 bg-gray-50">
        <Services />
        <Benefits />
        {/* <BrandCarousel /> */}
      </div>
    </main>
  );
}