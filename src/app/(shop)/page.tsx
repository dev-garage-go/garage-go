import { Banner, Benefits, CarsBrandsCarousel, FAQs, Hero, UserReviews } from "@/features/home";
import { Services } from "@/features/services";

export default function HomePage() {
  return (
    <main className="new-page">
      <Hero />
      <Services />
      <Benefits />
      <div className="pt-20 sm:pt-24 md:pt-28 xl:pt-32">
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