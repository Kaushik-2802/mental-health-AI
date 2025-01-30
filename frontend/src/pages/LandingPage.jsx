import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/Benifits";
import Collaboration from "../components/Collaboration";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import Roadmap from "../components/Roadmap";

const LandingPage = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />

        <Pricing />
        <Roadmap />
        <Contact />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default LandingPage;
