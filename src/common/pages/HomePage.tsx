import BookSection from "../../features/book/components/BookSection"
import CategorySection from "../components/homepage/CategorySection"
import ExerciseInfoSection from "../components/homepage/ExerciseInfoSection"
import HeroSection from "../components/homepage/HeroSection"


const HomePage = () => {

  return (
    <div className="w-full flex flex-col gap-16 mb-8 scrollbar-hide">
        <HeroSection />

        <BookSection title="Continue Reading" />

        <ExerciseInfoSection />

        <BookSection title="New Releases" />

        <BookSection title="Popular" />

        <CategorySection />
    </div>
  );
};

export default HomePage;
