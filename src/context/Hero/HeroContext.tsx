import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeroApi from "../../api/HeroApi";
import { HeroProps } from "../../types/Hero.types";

interface HeroContextProps {
	data: HeroProps;
	isLoading: boolean;
	updateData: (data: HeroProps) => Promise<void>;
	isUpdating: boolean;
}

interface HeroProviderProps {
	children: React.ReactNode;
}

export const HeroContext = createContext<HeroContextProps>({
	data: {
		title: "",
		subtitle: "",
		image: "",
		curriculum: ""
	},
	updateData: async () => {},
	isLoading: true,
	isUpdating: false
});

export const HeroProvider = ({ children }: HeroProviderProps) => {
	const [data, setData] = useState<HeroProps>({
		title: "",
		subtitle: "",
		image: "",
		curriculum: ""
	});
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const getData = async () => {
		setIsLoading(true);
		const response = await HeroApi.getHero();

		if (response) {
			setData(response);
		}

		setIsLoading(false);
	};

	const updateData = async (data: HeroProps) => {
		try {
			setIsUpdating(true);
			await HeroApi.updateHero(data);
			toast.success("Dados atualizados com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
		setIsUpdating(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<HeroContext.Provider
			value={{
				data,
				updateData,
				isLoading,
				isUpdating
			}}>
			{children}
		</HeroContext.Provider>
	);
};
