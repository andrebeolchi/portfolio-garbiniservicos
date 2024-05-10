import { useContext } from "react";
import { HeroContext } from "./HeroContext";

export const useHero = () => useContext(HeroContext);
