import { Banner, Benefits, BrandCarousel, FAQs, Hero, Services, UserReviews } from "@/components";

export default function HomePage() {
  return (
    <main className="relative bg-white min-h-screen ">
      <Hero />
      <div className="py-10 md:py-16">
        <Services />
        <Benefits />
        <BrandCarousel />
        <Banner />
        <UserReviews />
        <FAQs />
      </div>
    </main>
  );
}