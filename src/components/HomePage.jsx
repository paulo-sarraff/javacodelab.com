import Header from './Header'
import HeroSection from './HeroSection'
import FeaturedCarousel from './FeaturedCarousel'
import LatestPosts from './LatestPosts'
// import ShopTeaser from './ShopTeaser' // oculto até Fase 4
import NewsletterSignup from './NewsletterSignup'
import Footer from './Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCarousel />
        <LatestPosts />
        {/* <ShopTeaser /> — oculto até Fase 4 */}
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
