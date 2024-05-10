import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AcademicApi from "../../api/AcademicApi";
import { AcademicDetailsProps, AcademicItemProps, AcademicProps } from "../../types/Academic.types";

interface AcademicContextProps {
	data?: AcademicProps;
	isLoading: boolean;
	updateData: (data: AcademicDetailsProps) => Promise<void>;
	createItem: (data: AcademicItemProps) => Promise<void>;
	updateItem: (data: AcademicItemProps) => Promise<void>;
	reorderItems: (data: AcademicItemProps[]) => Promise<void>;
	deleteItem: (id: string) => Promise<void>;
}

interface AcademicProviderProps {
	children: React.ReactNode;
}

export const AcademicContext = createContext<AcademicContextProps>({
	data: {
		title: "",
		description: "",
		items: []
	},
	updateData: async () => {},
	createItem: async () => {},
	updateItem: async () => {},
	deleteItem: async () => {},
	reorderItems: async () => {},
	isLoading: true
});

export const AcademicProvider = ({ children }: AcademicProviderProps) => {
	const [data, setData] = useState<AcademicProps>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const getData = async () => {
		setIsLoading(true);

		const [details, list] = await Promise.all([AcademicApi.getAcademicDetails(), AcademicApi.getAcademicList()]);

		if (details && list) {
			setData({
				title: details.title ?? "",
				description: details.description ?? "",
				items: list ?? []
			});
		}
		setIsLoading(false);
	};

	const updateData = async (data: AcademicDetailsProps) => {
		try {
			await AcademicApi.updateAcademicDetails(data);
			toast.success("Dados atualizados com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
	};

	const createItem = async (data: AcademicItemProps) => {
		try {
			await AcademicApi.createAcademicItem(data);
			toast.success("Item criado com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
	};

	const updateItem = async (data: AcademicItemProps) => {
		try {
			await AcademicApi.updateAcademicItem(data);
			toast.success("Item criado com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
	};

	const deleteItem = async (id: string) => {
		try {
			await AcademicApi.deleteAcademicItem(id);

			toast.success("Item deletado com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao deletar o item!");
		}
	};

	const reorderItems = async (data: AcademicItemProps[]) => {
		try {
			await AcademicApi.reorderAcademicItems(data);

			toast.success("Itens reordenados com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao deletar o item!");
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const value = {
		data,
		updateData,
		createItem,
		deleteItem,
		updateItem,
		reorderItems,
		isLoading
	};

	return <AcademicContext.Provider value={value}>{children}</AcademicContext.Provider>;
};
