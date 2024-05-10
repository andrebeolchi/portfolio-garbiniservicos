import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";

function App() {
	return (
		<div className="h-screen">
			<ToastContainer />
			<AppRoutes />
		</div>
	);
}

export default App;
