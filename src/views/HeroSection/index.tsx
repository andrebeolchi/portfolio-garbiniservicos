import { Link } from "react-scroll";
import HeaderTabs from "../../components/HeaderTabs";
import { useAcademic } from "../../context/Academic/AcademicContext.hooks";
import { useFooter } from "../../context/Footer/FooterContext.hooks";
import { useHero } from "../../context/Hero/HeroContext.hooks";
import { useProjects } from "../../context/Projects/ProjectsContext.hooks";

export default function HeroSection() {
	const { data: details } = useHero();
	const { data: projects } = useProjects();
	const { data: academic } = useAcademic();
	const { data: footer } = useFooter();

	const tabs = [];

	if (academic && academic?.items.length > 0) {
		tabs.push({
			name: "Formação",
			to: "academic"
		});
	}

	if (projects && projects?.items.length > 0) {
		tabs.push({
			name: "Projetos",
			to: "projects",
			submenus: projects?.items.map((project) => ({
				name: project.title,
				description: project.description,
				image: project.images[0].url,
				to: project.id
			}))
		});
	}

	tabs.push({
		name: "Contato",
		href: footer?.social?.whatsapp ?? "#"
	});

	return (
		<div
			className="bg-gray-50"
			id="hero">
			<HeaderTabs tabs={tabs} />
			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true">
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#c7ff6d] to-[#e7ffc4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
						}}
					/>
				</div>
				<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{details?.title}</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">{details?.subtitle}</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<span
								className="cursor-pointer rounded-md bg-light-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-500 transition ease-in-out"
								onClick={() => window.open(footer?.social?.whatsapp ?? "#", "_blank")}>
								Contato
							</span>
							<Link
								to={"projects"}
								className="transition-colors text-sm font-semibold leading-6 text-gray-900 hover:text-light-green-500 cursor-pointer"
								smooth={true}
								duration={500}
								spy={true}>
								Ver mais <span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
				</div>
				<div
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					aria-hidden="true">
					<div
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#c7ff6d] to-[#e7ffc4] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
						}}
					/>
				</div>
			</div>
		</div>
	);
}
