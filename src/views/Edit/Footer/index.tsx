import { MagnifyingGlassPlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFooter } from "../../../context/Footer/FooterContext.hooks";
import { FooterGroup, FooterSocial } from "../../../types/Footer";

export default function EditFooterItems() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [groups, setGroups] = useState<FooterGroup[]>([]);
	const [social, setSocial] = useState<FooterSocial>();

	const { data: footer, upsertData, updateSocial, isUpdating } = useFooter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await Promise.all([upsertData(groups), updateSocial(social as FooterSocial)]);

			navigate("/edit/footer");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
	};

	useEffect(() => {
		if (footer) {
			setGroups(footer.list);
			setSocial(footer.social);
		}
	}, [footer, id]);

	if (!footer) {
		return null;
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
			<form
				method={"POST"}
				onSubmit={handleSubmit}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<div className="flex flex-1 flex-row justify-between items-center">
							<div>
								<h2 className="text-base font-semibold leading-7 text-gray-900">Informações do Rodapé</h2>
								<p className="mt-1 text-sm leading-6 text-gray-600">
									Essas informações serão exibidas publicamente, então tenha cuidado com o que você compartilha.
								</p>
							</div>
							<div>
								<button
									type="button"
									onClick={() => setGroups([...groups, { title: "", items: [{ title: "", href: "" }] }])}
									className="rounded-md bg-light-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-600">
									Novo Grupo
								</button>
							</div>
						</div>

						<div className="mt-10">
							<div className="sm:col-span-full">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-gray-900">
									Redes Sociais
								</label>
								{/* Instagram */}
								<div className="mt-2.5 flex flex-row flex-1 justify-between items-center group">
									<div className="flex-1 flex flex-row mr-2.5">
										<svg
											className="h-8 w-8 mr-2.5"
											fill="currentColor"
											viewBox="0 0 30 30"
											aria-hidden="true">
											<path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
										</svg>
										<div className="flex flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-light-green-600">
											<input
												type="text"
												name="title"
												id="title"
												autoComplete="title"
												className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder="https://www.instagram.com/user"
												value={social?.instagram}
												onChange={(event) => {
													if (social) {
														setSocial({
															...social,
															instagram: event.target.value
														});
													}
												}}
											/>
										</div>
									</div>
								</div>

								{/* WhatsApp */}
								<div className="mt-2.5 flex flex-row flex-1 justify-between items-center group">
									<div className="flex-1 flex flex-row mr-2.5">
										<svg
											className="h-8 w-8 mr-2.5"
											fill="currentColor"
											viewBox="0 0 30 30"
											aria-hidden="true">
											<path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"></path>
										</svg>
										<div className="flex flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-light-green-600">
											<input
												type="text"
												name="title"
												id="title"
												autoComplete="title"
												className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
												placeholder="https://wa.me//55968349464"
												value={social?.whatsapp}
												onChange={(event) => {
													if (social) {
														setSocial({
															...social,
															whatsapp: event.target.value
														});
													}
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						{groups?.map((group, groupIndex) => (
							<div
								key={groupIndex}
								className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 bg-gray-50 rounded-xl shadow-xl ring-1 ring-gray-400/10 p-4">
								<div className="sm:col-span-full">
									<label
										htmlFor="title"
										className="block text-sm font-medium leading-6 text-gray-900">
										Título*
									</label>
									<div className="mt-2 flex flex-row flex-1 justify-between">
										<div className="flex-1 flex flex-row mr-2.5">
											<button
												type="button"
												className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-red-400/10 mr-2.5"
												onClick={() => {
													const groupsCopy = [...groups];
													groupsCopy.splice(groupIndex, 1);
													setGroups(groupsCopy);
												}}>
												<TrashIcon className="h-5 w-5 text-red-600" />
											</button>
											<div className="flex flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-light-green-600">
												<input
													type="text"
													name="title"
													id="title"
													autoComplete="title"
													className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
													placeholder="Ex: Faculdade XPTO"
													value={group.title}
													required
													onChange={(event) => {
														const groupsCopy = [...groups];
														groupsCopy[groupIndex].title = event.target.value;
														setGroups(groupsCopy);
													}}
												/>
											</div>
										</div>
										<div>
											<button
												className="rounded-md bg-light-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-600"
												onClick={() => {
													const groupsCopy = [...groups];
													groupsCopy[groupIndex].items.push({ title: "", href: "" });
													setGroups(groupsCopy);
												}}>
												Novo Item
											</button>
										</div>
									</div>
								</div>

								<div className="sm:col-span-full">
									<label
										htmlFor="title"
										className="block text-sm font-medium leading-6 text-gray-900">
										Itens*
									</label>
									{group.items?.map((item, groupItemIndex) => (
										<div
											className="flex flex-row flex-1 mt-2"
											key={groupItemIndex}>
											<button
												type="button"
												className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 bg-red-400/10 mr-2.5"
												onClick={() => {
													const groupsCopy = [...groups];
													groupsCopy[groupIndex].items.splice(groupItemIndex, 1);
													setGroups(groupsCopy);
												}}>
												<TrashIcon className="h-5 w-5 text-red-600" />
											</button>
											<div className="flex flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-light-green-600 mr-2.5">
												<input
													type="text"
													name="title"
													id="title"
													autoComplete="title"
													className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
													placeholder="Título do item"
													value={item?.title}
													required
													onChange={(event) => {
														const groupsCopy = [...groups];
														groupsCopy[groupIndex].items[groupItemIndex].title = event.target.value;
														setGroups(groupsCopy);
													}}
												/>
											</div>
											<div className="flex flex-1 rounded-md gap-2">
												{(item?.href || item?.inputedFile) && (
													<a
														href={item?.inputedFile ? URL.createObjectURL(item?.inputedFile) : item?.href}
														target="_blank"
														rel="noopener noreferrer"
														className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
														<MagnifyingGlassPlusIcon className="h-5 w-5" />
													</a>
												)}
												<label
													htmlFor="cv-upload"
													className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
													{item?.inputedFile ? item?.inputedFile.name : "Mudar"}
													<input
														id="cv-upload"
														name="cv-upload"
														type="file"
														accept=".pdf"
														className="sr-only"
														onChange={(event) => {
															if (event.target.files?.[0]) {
																const groupsCopy = [...groups];
																groupsCopy[groupIndex].items[groupItemIndex].inputedFile =
																	event.target.files?.[0] ?? undefined;
																setGroups(groupsCopy);
															}
														}}
													/>
												</label>
											</div>
										</div>
									))}
									{group.items?.length === 0 && (
										// Empty State Message
										<div className="flex flex-row flex-1 mt-2">
											<div className="flex flex-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-light-green-600 mr-2.5">
												<span className="block flex-1 border-0 bg-transparent py-1.5 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 text-center">
													Nenhum item adicionado
												</span>
											</div>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						className={`rounded-md bg-light-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-600 ${
							isUpdating ? "opacity-50 cursor-not-allowed" : ""
						}`}>
						{isUpdating ? "Salvando..." : "Salvar"}
					</button>
				</div>
			</form>
		</div>
	);
}
