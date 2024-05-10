import { FirebaseError } from "@firebase/util";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth/AuthContext.hooks";
import { signIn } from "../utils/firebase";

export default function Login() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await signIn(email, password);

			clearFields();
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				switch (error.code as FirebaseError["code"]) {
					case "auth/invalid-credential":
					case "auth/wrong-password":
					case "auth/user-not-found":
						toast.error("Por favor, verifique o email e/ou senha");
						break;
				}
			}
		}
	};

	const clearFields = () => {
		setEmail("");
		setPassword("");
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/edit");
		}
	}, [isAuthenticated, navigate]);

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Entre com sua conta
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						action="#"
						onSubmit={handleSubmit}
						method="POST">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900">
								Email
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									onChange={(event) => setEmail(event.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-green-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900">
									Senha
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									onChange={(event) => setPassword(event.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-green-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-light-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-green-600 transition ease-in-out">
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
