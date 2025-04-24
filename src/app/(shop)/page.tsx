import { Banner, Benefits, BrandCarousel, FAQs, Hero, Services, UserReviews } from "@/components";

export default function HomePage() {
  return (
    <main className="relative bg-white min-h-screen ">
      <Hero />
      <Services />
      <Benefits />
      <BrandCarousel />
      <Banner />
      <div className="bg-gray-100 h-full">
        <UserReviews />
        <FAQs />
      </div>
    </main>
  );
}