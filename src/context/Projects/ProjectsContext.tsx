import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProjectsApi from "../../api/ProjectsApi";
import { ProjectsDetailsProps, ProjectsItemProps, ProjectsProps } from "../../types/Projects.types";

interface ProjectsContextProps {
	data?: ProjectsProps;
	isLoading: boolean;
	updateData: (data: ProjectsDetailsProps) => Promise<void>;
	createItem: (data: ProjectsItemProps) => Promise<void>;
	updateItem: (data: ProjectsItemProps) => Promise<void>;
	reorderItems: (data: ProjectsItemProps[]) => Promise<void>;
	deleteItem: (id: string) => Promise<void>;
}

interface ProjectsProviderProps {
	children: React.ReactNode;
}

export const ProjectsContext = createContext<ProjectsContextProps>({
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

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
	const [data, setData] = useState<ProjectsProps>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const getData = async () => {
		setIsLoading(true);

		const [details, list] = await Promise.all([ProjectsApi.getProjectsDetails(), ProjectsApi.getProjectsList()]);

		setData({
			title: details?.title ?? "",
			description: details?.description ?? "",
			items: list ?? []
		});
		setIsLoading(false);
	};

	const updateData = async (data: ProjectsDetailsProps) => {
		try {
			await ProjectsApi.updateProjectsDetails(data);
			toast.success("Dados atualizados com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
	};

	const createItem = async (data: ProjectsItemProps) => {
		try {
			await ProjectsApi.createProjectsItem(data);
			toast.success("Item criado com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
	};

	const updateItem = async (data: ProjectsItemProps) => {
		try {
			await ProjectsApi.updateProjectsItem(data);
			toast.success("Item atualizado com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao atualizar os dados!");
		}
	};

	const deleteItem = async (id: string) => {
		try {
			await ProjectsApi.deleteProjectsItem(id);

			toast.success("Item deletado com sucesso!");
		} catch (error) {
			toast.error("Ocorreu um erro ao deletar o item!");
		}
	};

	const reorderItems = async (data: ProjectsItemProps[]) => {
		try {
			await ProjectsApi.reorderProjectsItems(data);

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

	return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};
