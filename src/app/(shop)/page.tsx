import { Banner, Benefits, CarsBrandsCarousel, FAQs, Hero, UserReviews } from "@/features/home";
import { Services } from "@/features/services";

export default function HomePage() {
  return (
    <main className="new-page">
      <Hero />
      <Services />
      <Benefits />
      <div className="padding-section">
        <CarsBrandsCarousel />
      </div>
      <Banner />
      <section className="bg-gray-100 h-full">
        <UserReviews />
        <FAQs />
      </section>
    </main>
  );
}