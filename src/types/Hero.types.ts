import { InputFile, InputImage } from "./Projects.types";

export interface HeroProps {
	title: string;
	subtitle: string;
	inputedImage?: InputImage;
	image: string;
	inputedCurriculum?: InputFile;
	curriculum: string;
}
