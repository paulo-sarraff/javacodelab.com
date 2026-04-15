import { getFeaturedArticles } from '@/data/articles'
import Header from './Header'
import HeroSection from './HeroSection'
import FeaturedCarousel from './FeaturedCarousel'
import LatestPosts from './LatestPosts'
import ShopTeaser from './ShopTeaser'
import NewsletterSignup from './NewsletterSignup'
import Footer from './Footer'

const HomePage = async () => {
  const featuredArticles = await getFeaturedArticles(5)

  return (
    <div className="min-h-screen bg-[#1A1A1B] text-[#E8E8E8]">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCarousel articles={featuredArticles} />
        <LatestPosts />
        <ShopTeaser />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
