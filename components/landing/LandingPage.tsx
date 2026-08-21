import Navbar from "./Navbar";
import Hero from "./Hero";
import Impact from "./Impact";
import FeatureGrid from "./FeatureGrid";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f8faf9]">
      <Navbar />
      <Hero />
      <Impact />
      <FeatureGrid />
      <CallToAction />
      <Footer />
    </div>
  );
}
