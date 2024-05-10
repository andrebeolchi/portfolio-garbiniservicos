import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { FlyoutMenuProps } from "./types";

export default function FlyoutMenu({ menu }: { menu: FlyoutMenuProps }) {
	const { name, submenus, callsToAction, href, emptyState, to } = menu;

	const isExpandable = Boolean(submenus?.length) || Boolean(callsToAction?.length);

	return (
		<Popover className="relative">
			<Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 group">
				{to ? (
					<Link
						to={to}
						className="transition-colors group-hover:text-light-green-600"
						smooth={true}
						duration={500}
						spy={true}>
						{name}
					</Link>
				) : (
					<span
						onClick={(e) => {
							if (!isExpandable) {
								e.preventDefault();
								window.open(href, "_blank");
							}
						}}
						className="transition-colors group-hover:text-light-green-600">
						{name}
					</span>
				)}
				{isExpandable && (
					<ChevronDownIcon
						className="h-5 w-5 transition-colors group-hover:text-light-green-600"
						aria-hidden="true"
					/>
				)}
			</Popover.Button>

			{isExpandable && (
				<Transition
					as={Fragment}
					enter="transition ease-out duration-200"
					enterFrom="opacity-0 translate-y-1"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-in duration-150"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 translate-y-1">
					<Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
						<div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
							<div className="p-4">
								{submenus?.length === 0 && (
									<div className="flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
										<div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-50">
											<InformationCircleIcon
												className="h-6 w-6 text-gray-600 group-hover:text-light-green-500"
												aria-hidden="true"
											/>
										</div>
										<div>
											<span className="font-semibold text-gray-900  text-center">
												{emptyState?.title || "Nenhum item adicionado"}
												<span className="absolute inset-0" />
											</span>
											<p className="mt-1 text-gray-600 line-clamp-2">
												{emptyState?.description || "Adicione algum para que seja exibido em sua página."}
											</p>
										</div>
									</div>
								)}
								{submenus?.map((item) => (
									<div
										key={item.name}
										className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
										title={item.description}>
										<div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
											{item.icon ? (
												<item.icon
													className="h-8 w-8 text-gray-600 group-hover:text-light-green-500"
													aria-hidden="true"
												/>
											) : (
												item.image && (
													<img
														className="h-8 w-8 flex-none text-gray-400 object-contain"
														src={item.image}
														aria-hidden="true"
													/>
												)
											)}
										</div>
										<div>
											{item.to ? (
												<Link
													to={item.to}
													className="font-semibold text-gray-900 z-20 cursor-pointer"
													smooth={true}
													duration={500}
													spy={true}>
													{item.name}
													<span className="absolute inset-0" />
												</Link>
											) : (
												<NavLink
													to={item.href ?? "/"}
													className="font-semibold text-gray-900 z-20 cursor-pointer">
													{item.name}
													<span className="absolute inset-0" />
												</NavLink>
											)}
											<p className="text-gray-600 line-clamp-1">{item.description}</p>
										</div>
									</div>
								))}
							</div>
							<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
								{callsToAction?.map((item) => (
									<NavLink
										key={item.name}
										to={item.href || "/"}
										className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-50 z-20">
										{item.icon && (
											<item.icon
												className="h-5 w-5 flex-none text-gray-400"
												aria-hidden="true"
											/>
										)}
										{item.name}
									</NavLink>
								))}
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			)}
		</Popover>
	);
}
