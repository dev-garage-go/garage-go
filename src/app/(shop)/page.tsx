import { Banner, Benefits, FAQs, Hero, CarsBrandsCarousel, Services, UserReviews } from "@/components";

export default function HomePage() {
  return (
    <main className="new-page">
      <Hero />
      <Services />
      <Benefits />
      <CarsBrandsCarousel />
      <Banner />
      <div className="bg-gray-100 h-full">
        <UserReviews />
        <FAQs />
      </div>
    </main>
  );
}