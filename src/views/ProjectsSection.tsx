import { Carousel, Dialog, DialogBody, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { useProjects } from "../context/Projects/ProjectsContext.hooks";
import { ImagesProps } from "../types/Projects.types";

export default function ProjectsSection() {
	const { data: projectsData } = useProjects();

	const [selectedImage, setSelectedImage] = useState<ImagesProps | null>(null);

	const handleOpen = () => {
		if (selectedImage) {
			setSelectedImage(null);
		}
	};

	if (!projectsData || !projectsData.items.length) {
		return null;
	}

	return (
		<div
			className="overflow-hidden py-24 sm:py-32"
			id="projects">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{projectsData.title}</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">{projectsData.description}</p>
				</div>
			</div>
			<div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8 border-t border-gray-200 sm:mt-16">
				{projectsData.items?.map((item, index) => {
					const isEven = index % 2 === 0;
					const isLeft = isEven ? "lg:pr-8" : "lg:pl-8";

					return (
						<div
							key={item?.id}
							className={`mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 border-b py-32`}
							id={item?.id}>
							<div className={`lg:pt-4 ${isEven || "lg:order-last"} ${isLeft}`}>
								<div className="lg:max-w-lg">
									<h2 className="text-base font-semibold leading-7 text-light-green-600 uppercase tracking-wider">
										{item?.subtitle}
									</h2>
									<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{item?.title}</p>
									<p className="mt-6 text-lg leading-8 text-gray-600">{item?.description}</p>
									<dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
										{item?.bullets?.map((bullet, index) => (
											<div
												key={index}
												className="relative pl-9">
												<dt className="inline font-semibold text-gray-900">
													<bullet.icon
														className="absolute left-1 top-1 h-5 w-5 text-light-green-600"
														aria-hidden="true"
													/>
													{bullet.title}
												</dt>{" "}
												<dd className="inline">{bullet.description}</dd>
											</div>
										))}
									</dl>
								</div>
							</div>
							<div className="flex w-full sm:w-[32rem] rounded-xl md:-ml-4 lg:-ml-0 place-self-center bg-gray-50 p-4 border-gray-900/10 border shadow-sm">
								<Carousel
									autoplay={true}
									loop={true}
									autoplayDelay={2500}
									className="rounded-xl"
									placeholder={item?.title}
									prevArrow={({ handlePrev }) =>
										item.images.length > 1 && (
											<IconButton
												variant="text"
												color="light-green"
												placeholder={"previous"}
												size="lg"
												onClick={handlePrev}
												className="!absolute top-2/4 left-4 -translate-y-2/4">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-6 w-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
													/>
												</svg>
											</IconButton>
										)
									}
									nextArrow={({ handleNext }) =>
										item.images.length > 1 && (
											<IconButton
												placeholder={""}
												variant="text"
												color="light-green"
												size="lg"
												onClick={handleNext}
												className="!absolute top-2/4 !right-4 -translate-y-2/4">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-6 w-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
													/>
												</svg>
											</IconButton>
										)
									}
									navigation={({ setActiveIndex, activeIndex, length }) =>
										item.images.length > 1 && (
											<div className="absolute bottom-2 left-2/4 z-50 flex -translate-x-2/4 gap-2">
												{new Array(length).fill("").map((_, i) => (
													<span
														key={i}
														className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
															activeIndex === i ? "w-8 bg-light-green-600" : "w-4 bg-gray-400/90"
														}`}
														onClick={() => setActiveIndex(i)}
													/>
												))}
											</div>
										)
									}>
									{item?.images
										?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
										?.map((image) => (
											<img
												key={image?.id}
												src={image?.url}
												alt={image?.title}
												className="w-full sm:w-[32rem] h-[20rem] object-contain"
												width={2432}
												height={1442}
												onClick={() => setSelectedImage(image)}
											/>
										))}
								</Carousel>
							</div>
						</div>
					);
				})}
			</div>
			<Dialog
				placeholder={""}
				open={Boolean(selectedImage !== null && selectedImage?.url)}
				handler={handleOpen}
				size="xl">
				<DialogBody
					placeholder={""}
					className="flex flex-1 h-[80vh]">
					<img
						key={selectedImage?.id}
						src={selectedImage?.url}
						alt={selectedImage?.title}
						className="object-contain flex flex-1"
					/>
				</DialogBody>
			</Dialog>
		</div>
	);
}
{
	/* <img
src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
alt="Product screenshot"
className="w-[48rem] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 place-self-center"
/> */
}
