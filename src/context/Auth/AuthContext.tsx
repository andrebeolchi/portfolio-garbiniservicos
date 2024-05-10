import { createContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase";

interface AuthContextProps {
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
	isAuthenticated: false,
	isLoading: true
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsAuthenticated(true);
				setIsLoading(false);
			} else {
				setIsAuthenticated(false);
				setIsLoading(false);
			}
		});
	}, []);

	const value = {
		isAuthenticated,
		isLoading
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
