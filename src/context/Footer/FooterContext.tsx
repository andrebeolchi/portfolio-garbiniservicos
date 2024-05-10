import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FooterApi from "../../api/FooterApi";
import { FooterGroup, FooterSocial } from "../../types/Footer";

interface FooterContextProps {
	data?: FooterData;
	isLoading: boolean;
	upsertData: (data: FooterGroup[]) => Promise<void>;
	updateSocial: (data: FooterSocial) => Promise<void>;
	isUpdating: boolean;
}

interface FooterData {
	list: FooterGroup[];
	social: FooterSocial;
}

interface FooterProviderProps {
	children: React.ReactNode;
}

export const FooterContext = createContext<FooterContextProps>({
	data: undefined,
	upsertData: async () => {},
	updateSocial: async () => {},
	isLoading: true,
	isUpdating: false
});

export const FooterProvider = ({ children }: FooterProviderProps) => {
	const [data, setData] = useState<FooterData>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isUpdatingData, setIsUpdatingData] = useState<boolean>(false);
	const [isUpdatingSocial, setIsUpdatingSocial] = useState<boolean>(false);

	const getData = async () => {
		setIsLoading(true);

		const [list, social] = await Promise.all([FooterApi.getFooterLists(), FooterApi.getFooterSocial()]);

		if (list) {
			setData({
				list,
				social: social as FooterSocial
			});
		}

		setIsLoading(false);
	};

	const upsertData = async (data: FooterGroup[]) => {
		try {
			setIsUpdatingData(true);
			await FooterApi.upsertFooterLists(data);
			toast.success("As listas foram atualizadas com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
		setIsUpdatingData(false);
	};

	const updateSocial = async (data: FooterSocial) => {
		setIsUpdatingSocial(true);
		try {
			await FooterApi.updateFooterSocial(data);
			toast.success("Suas mídias sociais foram atualizadas com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
		setIsUpdatingSocial(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<FooterContext.Provider
			value={{
				data,
				isLoading,
				upsertData,
				updateSocial,
				isUpdating: isUpdatingData || isUpdatingSocial
			}}>
			{children}
		</FooterContext.Provider>
	);
};
