import Hero from '@/frontend/components/Hero/Hero'
import HomeAbout from '@/frontend/components/HomeAbout'
import HomeServices from '@/frontend/components/HomeServices'
import HomeTourMainBlock from '@/frontend/components/HomeTourMainBlock'
import HomeWhyUs from '@/frontend/components/HomeWhyUs'
import HomePopularDestinations from '@/frontend/components/HomePopularDestinations'
import HomeTickets from '@/frontend/components/HomeTickets'
import HomeDocuments from '@/frontend/components/HomeDocuments'
import HomeFaq from '@/frontend/components/HomeFaq'
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
  )
}
