import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext.hooks";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (!isAuthenticated && !isLoading) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return children;
};
