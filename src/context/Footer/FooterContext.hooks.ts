import { useContext } from "react";
import { FooterContext } from "./FooterContext";

export const useFooter = () => useContext(FooterContext);
