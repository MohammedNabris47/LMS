import CallToAction from "../../components/student/CallToAction";
import Companies from "../../components/student/Companies";
import CoursesSection from "../../components/student/CoursesSection";
import Footer from "../../components/student/Footer";
import Hero from "../../components/student/Hero";
import TestimonialsSection from "../../components/student/TestimonialsSection";

const Home = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-5">
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
