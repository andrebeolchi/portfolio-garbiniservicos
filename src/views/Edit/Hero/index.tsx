import { MagnifyingGlassPlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useHero } from "../../../context/Hero/HeroContext.hooks";
import { HeroProps } from "../../../types/Hero.types";
import { InputFile, InputImage } from "../../../types/Projects.types";

export default function EditHero() {
	const { data: details, updateData, isUpdating } = useHero();

	const [title, setTitle] = useState<HeroProps["title"]>("");
	const [subtitle, setSubtitle] = useState<HeroProps["subtitle"]>("");
	const [image, setImage] = useState<string>("");
	const [inputedImage, setInputedImage] = useState<InputImage | undefined>(undefined);
	const [curriculum, setCurriculum] = useState<string>("");
	const [inputedCurriculum, setInputedCurriculum] = useState<InputFile | undefined>(undefined);

	useEffect(() => {
		setTitle(details?.title ?? "");
		setSubtitle(details?.subtitle ?? "");
		setImage(details?.image ?? "");
		setCurriculum(details?.curriculum ?? "");
	}, [details]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await updateData({
				title,
				subtitle,
				image,
				inputedImage,
				curriculum,
				inputedCurriculum
			});
		} catch (error) {
			console.log("error ", error);
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
			<form
				method="POST"
				onSubmit={handleSubmit}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">Tela Inicial</h2>
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
									htmlFor="about"
									className="block text-sm font-medium leading-6 text-gray-900">
									Sobre
								</label>
								<div className="mt-2">
									<textarea
										id="about"
										name="about"
										rows={5}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-green-600 sm:text-sm sm:leading-6"
										onChange={(event) => setSubtitle(event.target.value)}
										value={subtitle}
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="photo"
									className="block text-sm font-medium leading-6 text-gray-900">
									Foto
								</label>
								<div className="mt-2 flex items-center gap-x-2.5">
									<img
										className="h-10 w-10"
										src={inputedImage ? URL.createObjectURL(inputedImage) : image}
									/>
									<label
										htmlFor="file-upload"
										className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
										<span>Mudar</span>
										<input
											id="file-upload"
											name="file-upload"
											type="file"
											accept="image/*"
											className="sr-only"
											onChange={(event) => setInputedImage(event.target.files?.[0] ?? undefined)}
										/>
									</label>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="photo"
									className="block text-sm font-medium leading-6 text-gray-900">
									Currículo
								</label>
								<div className="mt-2 flex items-center gap-x-2.5">
									{(details?.curriculum || inputedCurriculum) && (
										<a
											href={
												inputedCurriculum
													? URL.createObjectURL(inputedCurriculum ?? new File([], ""))
													: details?.curriculum
											}
											target="_blank"
											rel="noopener noreferrer"
											className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
											<MagnifyingGlassPlusIcon className="h-5 w-5" />
										</a>
									)}
									<label
										htmlFor="cv-upload"
										className="rounded-md bg-gray-50 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
										{inputedCurriculum ? inputedCurriculum.name : "Mudar"}
										<input
											id="cv-upload"
											name="cv-upload"
											type="file"
											accept=".pdf"
											className="sr-only"
											onChange={(event) =>
												event.target.files?.[0] ? setInputedCurriculum(event.target.files?.[0] ?? undefined) : undefined
											}
										/>
									</label>
								</div>
							</div>
						</div>
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
