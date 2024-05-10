import { useFooter } from "../context/Footer/FooterContext.hooks";
import { useHero } from "../context/Hero/HeroContext.hooks";

export default function Footer() {
	const { data: hero } = useHero();
	const { data: footer } = useFooter();

	if (!hero || !footer) {
		return null;
	}

	return (
		<footer className="relative w-full">
			<div className="mx-auto w-full max-w-7xl px-8">
				<div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
					<a
						href="/"
						className="flex items-center">
						<img
							src={hero?.image}
							className="h-8 me-3"
							alt={hero?.title}
						/>
						<span className="self-center text-wrap text-2xl font-semibold whitespace-nowrap dark:text-white">
							{hero?.title}
						</span>
					</a>
					<div className="grid grid-cols-2 sm:grid-cols-3 justify-between gap-8">
						{footer?.list?.map(({ title, items }) => (
							<ul key={title}>
								<span
									color="blue-gray"
									className="font-medium opacity-40">
									{title}
								</span>
								<div className="mt-3">
									{items.map(({ href, title }, index) => (
										<li
											key={index}
											className="mt-1.5">
											<span
												onClick={() => href.length > 3 && window.open(href, "_blank")}
												className={`py-1.5 font-normal ${
													href.length > 3 && "transition-colors hover:text-light-green-600 cursor-pointer"
												}`}>
												{title}
											</span>
										</li>
									))}
								</div>
							</ul>
						))}
					</div>
				</div>
				<div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
					<a className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0">
						© 2024 {`${new Date().getFullYear() === 2024 ? "" : ` - ${new Date().getFullYear()}`}`}
					</a>
					<div className="flex gap-4 text-blue-gray-900 sm:justify-center">
						{/* Facebook */}
						{/* <a
							href="#"
							className="opacity-80 hover:opacity-100 hover:text-light-green-600 transition ease-in-out">
							<svg
								className="h-6 w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
									clip-rule="evenodd"
								/>
							</svg>
						</a> */}

						{/* Instagram */}
						{Boolean(footer?.social?.instagram) && (
							<a
								href={footer?.social?.instagram}
								className="opacity-80 hover:opacity-100 hover:text-light-green-600 transition ease-in-out">
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 30 30"
									aria-hidden="true">
									<path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
								</svg>
							</a>
						)}

						{/* WhatsApp */}
						{Boolean(footer?.social?.whatsapp) && (
							<a
								href={footer?.social?.whatsapp}
								className="opacity-80 hover:opacity-100 hover:text-light-green-600 transition ease-in-out">
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 30 30"
									aria-hidden="true">
									<path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"></path>
								</svg>
							</a>
						)}

						{/* Twitter */}
						{/* <a
							href="#"
							className="opacity-80 hover:opacity-100 hover:text-light-green-600 transition ease-in-out">
							<svg
								className="h-6 w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true">
								<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
							</svg>
						</a> */}

						{/* Github */}
						{/* <a
							href="#"
							className="opacity-80 hover:opacity-100 hover:text-light-green-600 transition ease-in-out">
							<svg
								className="h-6 w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clip-rule="evenodd"
								/>
							</svg>
						</a> */}
					</div>
				</div>
			</div>
		</footer>
	);
}
