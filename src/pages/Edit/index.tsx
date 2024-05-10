import { AcademicCapIcon, FolderPlusIcon, PencilIcon } from "@heroicons/react/20/solid";
import HeaderTabs from "../../components/HeaderTabs";
import { useAcademic } from "../../context/Academic/AcademicContext.hooks";
import { useProjects } from "../../context/Projects/ProjectsContext.hooks";

export default function EditPage({ children }: { children: React.ReactNode }) {
	const { data: academicData } = useAcademic();
	const { data: projectsData } = useProjects();

	if (!academicData || !projectsData) {
		return null;
	}

	return (
		<div>
			<HeaderTabs
				tabs={[
					{
						name: "Início",
						href: "/edit"
					},
					{
						name: academicData.title,
						submenus: academicData.items?.map((item) => ({
							name: item.title,
							description: item.category,
							image: item.image,
							href: `/edit/academic/${item?.id}`
						})),
						emptyState: {
							title: "Nenhuma formação adicionada",
							description: "Adicione alguma para que seja exibido em sua página."
						},
						callsToAction: [
							{
								name: "Editar Detalhes",
								href: "/edit/academic",
								icon: PencilIcon
							},
							{
								name: "Adicionar Curso",
								href: "/edit/academic/new",
								icon: AcademicCapIcon
							}
						]
					},
					{
						name: projectsData.title,
						submenus: projectsData.items?.map((item) => ({
							name: item.title,
							description: item.subtitle,
							image: item.images[0]?.url,
							href: `/edit/projects/${item?.id}`
						})),
						callsToAction: [
							{
								name: "Editar Detalhes",
								href: "/edit/projects",
								icon: PencilIcon
							},
							{
								name: "Adicionar Projeto",
								href: "/edit/projects/new",
								icon: FolderPlusIcon
							}
						]
					},
					{
						name: "Rodapé",
						href: "/edit/footer"
					}
				]}
			/>

			{children}
		</div>
	);
}
