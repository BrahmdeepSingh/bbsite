import Hero from "../components/hero";
import FeaturedProducts from "../components/featured-products";
import WhyChooseUs from "../components/why-choose-us";
import Testimonials from "../components/testimonials";
import ContactForm from "../components/contact-form";
import CtaBanner from "../components/cta-banner";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <ContactForm />
      <CtaBanner />
    </div>
  );
}
