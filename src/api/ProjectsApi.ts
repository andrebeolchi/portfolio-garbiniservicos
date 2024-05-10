import {
	collection,
	deleteDoc,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
	updateDoc,
	writeBatch
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { ImagesProps, ProjectsDetailsProps, ProjectsItemProps } from "../types/Projects.types";
import { FirebaseError, db, storage } from "../utils/firebase";

class ProjectsApi {
	async getProjectsDetails(): Promise<ProjectsDetailsProps | void> {
		try {
			const detailsRef = doc(db, "data", "projects");

			const docSnap = await getDoc(detailsRef);

			return docSnap.data() as ProjectsDetailsProps;
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}

	async getProjectsList(): Promise<ProjectsItemProps[] | void> {
		try {
			const ref = collection(db, "data", "projects", "list");

			const ordered = query(ref, orderBy("order", "asc"));

			const data = await getDocs(ordered);

			return data.docs.map((doc) => doc.data() as ProjectsItemProps);
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}

	async updateProjectsDetails(data: ProjectsDetailsProps): Promise<void> {
		try {
			const detailsRef = doc(db, "data", "projects");

			const body = {
				title: data.title,
				description: data.description
			};

			await updateDoc(detailsRef, body);
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}

	async createProjectsItem(item: ProjectsItemProps): Promise<void> {
		try {
			const newId = uuidv4();

			const images = item.images;

			if (item.inputedImages && item.inputedImages?.length > 0) {
				await Promise.all(
					item.inputedImages?.map(async (inputedImage) => {
						const imageId = uuidv4();
						const storageRef = ref(storage, `projects/${newId}/${imageId}`);

						await uploadBytes(storageRef, inputedImage);

						const image = await getDownloadURL(storageRef);

						return images.push({
							url: image,
							order: inputedImage.order ?? 0,
							title: inputedImage.title ?? "",
							id: imageId
						});
					})
				);
			}

			const snapshot = await getCountFromServer(collection(db, "data/projects/list"));

			const body = {
				id: newId,
				title: item.title,
				subtitle: item.subtitle,
				images,
				description: item.description,
				order: (snapshot.data().count ?? 0) + 1
			};

			const detailsRef = doc(db, `data/projects/list/${newId}`);

			await setDoc(detailsRef, body);
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}

	async updateProjectsItem(item: ProjectsItemProps): Promise<void> {
		try {
			const images: ImagesProps[] = [];

			if (item.inputedImages && item.inputedImages?.length > 0) {
				await Promise.all(
					item.inputedImages?.map(async (inputedImage) => {
						if (!inputedImage?.id) {
							const imageId = uuidv4();
							const storageRef = ref(storage, `projects/${item.id}/${imageId}`);

							await uploadBytes(storageRef, inputedImage);

							const image = await getDownloadURL(storageRef);

							return images.push({
								url: image,
								order: inputedImage.order ?? 0,
								title: inputedImage.title ?? "",
								id: imageId
							});
						} else {
							return images.push({
								url: inputedImage.url ?? "",
								order: inputedImage.order ?? 0,
								title: inputedImage.title ?? "",
								id: inputedImage.id
							});
						}
					})
				);
			}

			const body = {
				title: item.title,
				subtitle: item.subtitle,
				images,
				description: item.description
			};

			const detailsRef = doc(db, `data/projects/list/${item.id}`);

			await updateDoc(detailsRef, body);
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}

	async deleteProjectsItem(id: string): Promise<void> {
		try {
			const detailsRef = doc(db, "data", "projects", "list", id);

			await deleteDoc(detailsRef);
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}

	async reorderProjectsItems(items: ProjectsItemProps[]): Promise<void> {
		try {
			const batch = writeBatch(db);

			items.forEach((item) => {
				const detailsRef = doc(db, "data", "projects", "list", item.id);

				batch.update(detailsRef, { order: item.order });
			});

			await batch.commit();
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}
}

export default new ProjectsApi();
