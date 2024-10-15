import Hero from "@/components/Hero/Hero";
import HomeAbout from "@/components/HomeAbout";
import HomeServices from "@/components/HomeServices";
import HomeTourMainBlock from "@/components/HomeTourMainBlock";
import HomeWhyUs from "@/components/HomeWhyUs";
import HomePopularDestinations from "@/components/HomePopularDestinations";

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeAbout />
      <HomeServices />
      <HomeTourMainBlock />
      <HomeWhyUs />
      <HomePopularDestinations />
      <HomePopularDestinations />
    </main>
  );
}
