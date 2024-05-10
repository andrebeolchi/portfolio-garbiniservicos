import Footer from "../components/Footer";
import AcademicSection from "../views/AcademicSection";
import HeroSection from "../views/HeroSection";
import ProjectsSection from "../views/ProjectsSection";

export default function Home() {
	return (
		<div>
			<HeroSection />
			<AcademicSection />
			<ProjectsSection />
			{/* <ContactSection /> */}  
			<Footer />
		</div>
	);
}
