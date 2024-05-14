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
			name: "Áreas",
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
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#555555] to-[#444444] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
						<div className="mt-10 flex items-center justify-center gap-x-5">
							<div
								className="flex flex-row items-center gap-x-2"
							>
								{Boolean(footer?.social?.whatsapp) && (
									<a
										className="cursor-pointer rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 transition ease-in-out"
										href={`https://wa.me/55${footer?.social?.whatsapp}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20projetos%20da%20${details?.title}.%20Poderia%20me%20ajudar?`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<svg
											className="h-5 w-5"
											fill="currentColor"
											viewBox="0 0 30 30"
											aria-hidden="true">
											<path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"></path>
										</svg>
									</a>
								)}
								<span
									className="cursor-pointer rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition ease-in-out"
									onClick={() => window.open(`tel:${footer?.social?.whatsapp}` ?? "#", "_blank")}>
									Contato
								</span>
							</div>
							<Link
								to={"projects"}
								className="transition-colors text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 cursor-pointer"
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
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#555555] to-[#444444] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
						}}
					/>
				</div>
			</div >
		</div >
	);
}
