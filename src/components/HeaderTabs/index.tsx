import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-scroll";
import { useHero } from "../../context/Hero/HeroContext.hooks";
import FlyoutMenu from "./FlyoutMenu";
import { FlyoutMenuProps } from "./types";

export default function HeaderTabs({ tabs }: { tabs: FlyoutMenuProps[] }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const { data } = useHero();

	return (
		<header className="absolute inset-x-0 top-0 z-50">
			<nav
				className="flex items-center justify-between p-6 lg:px-8"
				aria-label="Global">
				<div className="flex lg:flex-1">
					<Link
						to={"hero"}
						className="-m-1.5 p-1.5"
						smooth={true}
						duration={500}
						spy={true}>
						<img
							className="h-8 w-auto"
							src={data?.image}
							alt=""
						/>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}>
						<span className="sr-only">Abrir menu</span>
						<Bars3Icon
							className="h-6 w-6"
							aria-hidden="true"
						/>
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					{tabs.map((item, index) => (
						<FlyoutMenu
							menu={item}
							key={index}
						/>
					))}
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					{data?.curriculum && (
						<span
							className="transition-colors text-sm font-semibold leading-6 text-gray-900 hover:text-light-green-600 cursor-pointer"
							onClick={() => window.open(data?.curriculum, "_blank")}>
							Currículo <span aria-hidden="true">&darr;</span>
						</span>
					)}
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}>
				<div className="fixed inset-0 z-50" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-200 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link
							to={"hero"}
							className="-m-1.5 p-1.5 cursor-pointer"
							smooth={true}
							duration={500}
							spy={true}>
							<img
								className="h-8 w-auto"
								src={data?.image}
								alt=""
							/>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}>
							<span className="sr-only">Fechar menu</span>
							<XMarkIcon
								className="h-6 w-6"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{tabs?.map((item) =>
									item?.to ? (
										<Link
											key={item.name}
											to={item.to ?? ""}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 hover:text-light-green-600 cursor-pointer transition-colors " 
											onClick={() => setMobileMenuOpen(false)}>
											{item.name}
										</Link>
									) : (
										<span
											key={item.name}
											onClick={() => {
												window.open(item.href, "_blank");
												setMobileMenuOpen(false);
											}}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200 hover:text-light-green-600 cursor-pointer transition-colors ">
											{item.name}
										</span>
									)
								)}
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
