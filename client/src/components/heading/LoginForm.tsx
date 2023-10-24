import {FormEvent, useState} from "react";
import {useAuthContext} from "../../context/AuthContext";

function LoginForm({changeForm}: {changeForm: () => void}) {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const {login} = useAuthContext();

    const handleChange = (key: string, value: string) => {
        setFormState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(formState.email, formState.password);
    };
    return (
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                        <input
                            onChange={(e) => handleChange("email", e.target.value)}
                            type="email"
                            name="email"
                            id="email"
                            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => handleChange("password", e.target.value)}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-mainGreen hover:bg-primary-700 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-zinc-600 focus:outline-none focus:ring-4">
                        Login
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?{" "}
                        <span onClick={changeForm} className="text-mainGreen dark:text-primary-500 font-medium hover:underline cursor-pointer">
                            Sign up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
