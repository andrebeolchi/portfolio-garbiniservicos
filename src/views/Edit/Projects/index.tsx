import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useProjects } from "../../../context/Projects/ProjectsContext.hooks";
import { ProjectsDetailsProps, ProjectsItemProps } from "../../../types/Projects.types";

export default function EditProjects() {
	const { data: projectsData, updateData, reorderItems } = useProjects();

	const [title, setTitle] = useState<ProjectsDetailsProps["title"]>("");
	const [description, setDescription] = useState<ProjectsDetailsProps["description"]>("");
	const [items, setItems] = useState<ProjectsItemProps[]>([]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await Promise.all([
				updateData({
					title,
					description
				}),
				reorderItems(items)
			]);
		} catch (error) {
			console.log("error ", error);
		}
	};

	useEffect(() => {
		setTitle(projectsData?.title ?? "");
		setDescription(projectsData?.description ?? "");
		setItems(projectsData?.items ?? []);
	}, [projectsData]);

	if (!projectsData) {
		return null;
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
			<form
				method="POST"
				onSubmit={handleSubmit}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">Projetos</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Essas informações serão exibidas publicamente, então tenha cuidado com o que você compartilha.
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-4">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-gray-900">
									Título
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-light-green-600 sm:max-w-md">
										<input
											type="text"
											name="title"
											id="title"
											autoComplete="title"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Digite o título"
											value={title}
											onChange={(event) => setTitle(event.target.value)}
										/>
									</div>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="description"
									className="block text-sm font-medium leading-6 text-gray-900">
									Descrição
								</label>
								<div className="mt-2">
									<textarea
										id="description"
										name="description"
										rows={5}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-green-600 sm:text-sm sm:leading-6"
										onChange={(event) => setDescription(event.target.value)}
										value={description}
									/>
								</div>
							</div>
						</div>
					</div>

					{items.length > 0 && (
						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">Ordenação dos Projetos</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">Altere a ordem de exibição dos projetos.</p>

							<div className="mt-10 space-y-10">
								<fieldset>
									<legend className="text-sm font-semibold leading-6 text-gray-900 sr-only">Projetos</legend>
									<div className="mt-6 space-y-6">
										{items.map((item, index) => (
											<div
												key={item.id}
												className="flex items-center justify-between">
												<div className="flex items-center gap-x-3">
													<img
														className="h-10 w-10 object-contain"
														src={item.images[0]?.url}
														alt={item.title}
													/>
													<div>
														<h3 className="text-sm font-medium leading-6 text-gray-900">{item.title}</h3>
														<p className="text-sm leading-5 text-gray-500">{item.subtitle}</p>
													</div>
												</div>

												<div className="flex items-center gap-x-3">
													{index < items?.length - 1 && (
														<button
															type="button"
															className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
															onClick={() => {
																const newItems = [...items];
																const itemToMove = newItems[index];
																newItems[index] = newItems[index + 1];
																newItems[index + 1] = itemToMove;
																newItems[index + 1].order = index + 1;
																newItems[index].order = index;
																setItems(newItems);
															}}>
															<ArrowDownIcon className="h-5 w-5" />
														</button>
													)}
													{index > 0 && (
														<button
															type="button"
															className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
															onClick={() => {
																const newItems = [...items];
																const itemToMove = newItems[index];
																newItems[index] = newItems[index - 1];
																newItems[index - 1] = itemToMove;
																newItems[index - 1].order = index - 1;
																newItems[index].order = index;
																setItems(newItems);
															}}>
															<ArrowUpIcon className="h-5 w-5" />
														</button>
													)}
												</div>
											</div>
										))}
									</div>
								</fieldset>
							</div>
						</div>
					)}
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						className="rounded-md bg-light-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-600">
						Salvar
					</button>
				</div>
			</form>
		</div>
	);
}
