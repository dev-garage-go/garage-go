import { Banner, Benefits, BrandCarousel, Hero, Services } from "@/components";

export default function HomePage() {
  return (
    <main className="relative bg-white min-h-screen ">
      <Hero />
      <div className="py-10 md:py-16">
        <Services />
        <Benefits />
        <BrandCarousel />
        <Banner />
      </div>
    </main>
  );
}