import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../../../context/Projects/ProjectsContext.hooks";
import { InputImage, ProjectsItemProps } from "../../../types/Projects.types";

const InvisibleButton = () => (
	<div className="px-2.5 py-1.5 text-sm font-semibold text-gray-900 ">
		<div className="h-5 w-5" />
	</div>
);

export default function EditProjectsItems() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { data: projectsData, updateItem, createItem, deleteItem } = useProjects();
	const [inputedImages, setInputedImages] = useState<InputImage[]>([]);

	const [projects, setProjects] = useState<ProjectsItemProps>({
		id: id ?? "",
		title: "",
		subtitle: "",
		bullets: [],
		description: "",
		images: [],
		order: 0
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			if (id === "new") {
				await createItem({
					...projects,
					inputedImages
				});
			} else {
				await updateItem({ ...projects, inputedImages });
			}

			navigate("/edit/projects");
		} catch (error) {
			console.log("error ", error);
		}
	};

	useEffect(() => {
		if (id !== "new") {
			const item = projectsData?.items?.find((item) => item.id === id);

			if (item) {
				setProjects(item);

				if (item.images.length > 0) {
					setInputedImages(item.images as InputImage[]);
				}
			}
		}
	}, [projectsData, id]);

	if (!projectsData) {
		return null;
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
			<form
				method={id === "new" ? "POST" : "PUT"}
				onSubmit={handleSubmit}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							{id === "new" ? "Adicionar Projetos" : "Editar Projeto"}
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Essas informações serão exibidas publicamente, então tenha cuidado com o que você compartilha.
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-4">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-gray-900">
									Título*
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-light-green-600 sm:max-w-md">
										<input
											type="text"
											name="title"
											id="title"
											autoComplete="title"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Ex: Projeto XPTO"
											value={projects?.title}
											required
											onChange={(event) => setProjects({ ...projects, title: event.target.value })}
										/>
									</div>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label
									htmlFor="category"
									className="block text-sm font-medium leading-6 text-gray-900">
									Subtítulo*
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-light-green-600 sm:max-w-md">
										<input
											type="text"
											name="category"
											id="category"
											autoComplete="category"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Ex: Revit"
											value={projects?.subtitle}
											required
											onChange={(event) => setProjects({ ...projects, subtitle: event.target.value })}
										/>
									</div>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="description"
									className="block text-sm font-medium leading-6 text-gray-900">
									Descrição*
								</label>
								<div className="mt-2">
									<textarea
										id="description"
										name="description"
										rows={3}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-green-600 sm:text-sm sm:leading-6"
										onChange={(event) => setProjects({ ...projects, description: event.target.value })}
										value={projects.description}
									/>
								</div>
							</div>

							<div className="col-span-full mb-2">
								<label
									htmlFor="photo"
									className="block text-sm font-medium leading-6 text-gray-900">
									Fotos
								</label>
								<div className="mt-2 flex items-center gap-x-3">
									<label
										htmlFor="file-upload"
										className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
										<span>Adicionar</span>
										<input
											id="file-upload"
											name="file-upload"
											type="file"
											className="sr-only"
											multiple
											onChange={(event) => {
												const newFiles = Object.values(event.target.files || {});

												const order =
													inputedImages.length > 0 ? (inputedImages[inputedImages.length - 1]?.order ?? 0) + 1 : 0;
												newFiles.forEach((file: InputImage, index) => {
													file.order = order + index;
												});

												setInputedImages([...inputedImages, ...newFiles]);
											}}
										/>
									</label>
								</div>
							</div>
						</div>

						{inputedImages
							?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
							.map((item, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-8 bg-gray-50 my-2 rounded-lg">
									<div className="flex flex-1 items-center gap-x-3">
										<div>
											<h3 className="text-xl font-medium leading-6 text-gray-900 mr-4">{(item.order ?? 0) + 1}</h3>
										</div>
										<img
											className="h-10 w-10 object-contain "
											src={item?.name ? URL.createObjectURL(item) : item?.url}
										/>
										<div className="w-full">
											<input
												type="text"
												name="title"
												id="title"
												autoComplete="title"
												className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
												placeholder="Ex: Foto da fachada vista de cima"
												onChange={(event) => {
													const newItems = [...inputedImages];
													newItems[index].title = event.target.value;
													setInputedImages(newItems);
												}}
												value={item.title || ""}
											/>
										</div>
									</div>

									<div className="flex items-center gap-x-3">
										{index > 0 ? (
											<button
												type="button"
												className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												onClick={() => {
													const newItems = [...inputedImages];
													const itemToMove = newItems[index];
													newItems[index] = newItems[index - 1];
													newItems[index - 1] = itemToMove;
													newItems[index - 1].order = index - 1;
													newItems[index].order = index;
													setInputedImages(newItems);
												}}>
												<ArrowUpIcon className="h-5 w-5" />
											</button>
										) : (
											<InvisibleButton />
										)}

										{index < inputedImages?.length - 1 ? (
											<button
												type="button"
												className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												onClick={() => {
													const newItems = [...inputedImages];
													const itemToMove = newItems[index];
													newItems[index] = newItems[index + 1];
													newItems[index + 1] = itemToMove;
													newItems[index + 1].order = index + 1;
													newItems[index].order = index;
													setInputedImages(newItems);
												}}>
												<ArrowDownIcon className="h-5 w-5" />
											</button>
										) : (
											<InvisibleButton />
										)}

										<button
											type="button"
											className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-red-400/10"
											onClick={() => {
												// remove item from inputedImages
												const newItems = [...inputedImages];
												newItems.splice(index, 1);
												setInputedImages(newItems);
											}}>
											<TrashIcon className="h-5 w-5 text-red-600" />
										</button>
									</div>
								</div>
							))}
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					{id === "new" ? (
						<button
							type="submit"
							className="rounded-md bg-light-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-600">
							Salvar
						</button>
					) : (
						<>
							<button
								type="button"
								className="text-sm font-semibold leading-6 text-red-600"
								onClick={async () => {
									if (id && window.confirm("Tem certeza que deseja apagar?")) {
										await deleteItem(id);
										navigate("/edit/projects");
									}
								}}>
								Apagar
							</button>
							<button
								type="submit"
								className="rounded-md bg-light-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-600">
								Salvar
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
