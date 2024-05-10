import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { HeroProps } from "../types/Hero.types";
import { FirebaseError, db, storage } from "../utils/firebase";

class HeroApi {
	async getHero(): Promise<HeroProps | void> {
		try {
			const detailsRef = doc(db, "data", "hero-section");

			const docSnap = await getDoc(detailsRef);

			return docSnap.data() as HeroProps;
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}

	async updateHero(hero: HeroProps): Promise<void> {
		try {
			let image = hero.image;
			let curriculum = hero.curriculum;

			if (hero.inputedImage) {
				const storageRef = ref(storage, `images/icon`);

				await uploadBytes(storageRef, hero.inputedImage);

				image = await getDownloadURL(storageRef);
			}

			if (hero.inputedCurriculum) {
				const storageRef = ref(storage, `${hero.inputedCurriculum?.name}`);

				await uploadBytes(storageRef, hero.inputedCurriculum);

				curriculum = await getDownloadURL(storageRef);
			}

			const detailsRef = doc(db, "data", "hero-section");

			const body = {
				title: hero.title,
				subtitle: hero.subtitle,
				image,
				curriculum
			};

			await updateDoc(detailsRef, body);

			return;
		} catch (error) {
			if (error instanceof FirebaseError) {
				throw new Error(error.message);
			}
		}
	}
}

export default new HeroApi();
