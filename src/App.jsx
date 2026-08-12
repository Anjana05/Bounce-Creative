import content from './data/content.js'
import { VatProvider } from './VatContext.jsx'
import ProtoNote from './components/ProtoNote.jsx'
import PromoBar from './components/PromoBar.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import UspBar from './components/UspBar.jsx'
import CategoryTiles from './components/CategoryTiles.jsx'
import ProductCarousel from './components/ProductCarousel.jsx'
import TabbedProducts from './components/TabbedProducts.jsx'
import Reviews from './components/Reviews.jsx'
import ClientLogos from './components/ClientLogos.jsx'
import Accreditations from './components/Accreditations.jsx'
import Articles from './components/Articles.jsx'
import Newsletter from './components/Newsletter.jsx'
import Footer from './components/Footer.jsx'

// Section order is Design A's, with the live homepage's two tabbed product
// sections added after the carousel:
// promo · header · hero · usp · tiles · carousel · popular · eco · reviews ·
// logos · accreditations · blog · newsletter · footer
export default function App() {
  return (
    <VatProvider>
      <ProtoNote />
      <PromoBar promo={content.promo} />
      <Header nav={content.nav} suggestions={content.suggestions} />
      <main id="top">
        <Hero hero={content.hero} categories={content.categories} reviews={content.reviews} />
        <UspBar usps={content.usps} />
        <CategoryTiles categories={content.categories} />
        <ProductCarousel products={content.products} />
        <TabbedProducts
          id="popular" tone="popular" tabs={content.popularTabs}
          title="Our Popular Products"
          sub="The categories customers buy most — four best performers in each, priced from the lowest quantity break."
        />
        <TabbedProducts
          id="eco" tone="eco" tabs={content.ecoTabs}
          title="Our Eco Products"
          sub="Recycled, plant-based and low-carbon ranges, grouped by the material they are made from."
        />
        <Reviews reviews={content.reviews} />
        <ClientLogos clients={content.clients} />
        <Accreditations awards={content.awards} />
        <Articles articles={content.articles} />
        <Newsletter />
      </main>
      <Footer content={content} />
    </VatProvider>
  )
}
