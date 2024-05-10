import { useAcademic } from "../../context/Academic/AcademicContext.hooks";

export default function AcademicSection() {
	const { data } = useAcademic();

	if (!data || !data.items.length) {
		return null;
	}

	return (
		<div
			className="bg-gray-50 py-24 sm:py-32"
			id={"academic"}>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data?.title}</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600">{data?.description}</p>
				</div>
				<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{data?.items.map((post) => (
						<article
							key={post.id}
							className="flex max-w-xl flex-col items-start justify-between">
							{post.image && (
								<div className="mb-8 bg-gray-50 p-4 rounded-xl w-full border-gray-900/10  border shadow-sm">
									<img
										src={post.image}
										alt=""
										className="h-48 w-full rounded-lg object-contain"
									/>
								</div>
							)}
							<div className="flex items-center gap-x-4 text-xs">
								<p className="text-gray-500">{post.date}</p>
								<p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
									{post.category}
								</p>
							</div>
							<div className="group relative">
								<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
									<span>
										<span className="absolute inset-0" />
										{post.title}
									</span>
								</h3>
								{post.subtitle && <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.subtitle}</p>}
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
