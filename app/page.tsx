import Hero from "@/components/Hero/Hero";
import HomeAbout from "@/components/HomeAbout";
import HomeServices from "@/components/HomeServices";
import HomeTourMainBlock from "@/components/HomeTourMainBlock";
import HomeWhyUs from "@/components/HomeWhyUs";
import HomePopularDestinations from "@/components/HomePopularDestinations";
import HomeTickets from "@/components/HomeTickets";
import HomeDocuments from "@/components/HomeDocuments";
import HomeFaq from "@/components/HomeFaq";
export default function Home() {
  return (
    <main>
      <Hero />
      <HomeAbout />
      <HomeServices />
      <HomeTourMainBlock />
      <HomeWhyUs />
      <HomePopularDestinations />
      <HomeTickets />
      <HomeDocuments />
      <HomeFaq />
    </main>
  );
}
