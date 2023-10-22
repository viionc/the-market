import {useAuthContext} from "../context/AuthContext";
import {Formik, Form, Field} from "formik";
interface MyFormValues {
    username: string;
    email: string;
    password: string;
    password2: string;
}

function RegisterForm({changeForm}: {changeForm: () => void}) {
    const {register} = useAuthContext();

    const handleSubmit = (values: MyFormValues) => {
        register({username: values.username, password: values.password, email: values.email, token: "", id: ""});
    };

    const handleValidate = (values: MyFormValues) => {
        const errors: MyFormValues = {
            email: "",
            username: "",
            password: "",
            password2: "",
        };

        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }
        if (!values.username) {
            errors.username = "Required";
        }
        if (!values.password) {
            errors.password = "Required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be longer than 6.";
        }
        if (!values.password2 || values.password2 !== values.password) {
            errors.password2 = "Passwords must match";
        }
        if (errors.email !== "" || errors.password !== "" || errors.password !== "" || errors.password2 !== "") return errors;
        return {};
    };
    const initialValues: MyFormValues = {username: "", email: "", password: "", password2: ""};
    return (
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    validate={handleValidate}>
                    {(props) => (
                        <Form className="flex flex-col gap-2">
                            <Field
                                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                id="username"
                                name="username"
                                placeholder="Username"
                            />
                            {props.errors.username && <p className="text-red-500 text-sm">{props.errors.username}</p>}
                            <Field
                                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                id="email"
                                name="email"
                                placeholder="Email"
                            />
                            {props.errors.email && <p className="text-red-500 text-sm">{props.errors.email}</p>}
                            <Field
                                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                            {props.errors.password && <p className="text-red-500 text-sm">{props.errors.password}</p>}
                            <Field
                                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                id="password2"
                                name="password2"
                                type="password"
                                placeholder="Confirm Password"
                            />
                            {props.errors.password2 && <p className="text-red-500 text-sm">{props.errors.password2}</p>}
                            <button className="bg-mainGreen py-1 text-xl rounded-md hover:scale-105 active:ring-2 font-semibold" type="submit">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                    Already have an account?{" "}
                    <span onClick={changeForm} className="text-mainGreen dark:text-primary-500 font-medium hover:underline cursor-pointer">
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
}

//     return (
//         <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
//             <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
//                 <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
//                     <div>
//                         <input
//                             onChange={(e) => handleChange("username", e.target.value)}
//                             type="username"
//                             name="username"
//                             id="username"
//                             className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
//                             placeholder="Username"
//                         />
//                     </div>
//                     <div>
//                         <input
//                             onChange={(e) => handleChange("email", e.target.value)}
//                             type="email"
//                             name="email"
//                             id="email"
//                             className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
//                             placeholder="E-mail"
//                         />
//                     </div>
//                     <div>
//                         <input
//                             onChange={(e) => handleChange("password", e.target.value)}
//                             type="password"
//                             name="password"
//                             id="password"
//                             placeholder="Password"
//                             className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
//                         />
//                     </div>
//                     <div>
//                         <input
//                             onChange={(e) => handleChange("password2", e.target.value)}
//                             type="password"
//                             name="password2"
//                             id="password2"
//                             placeholder="Confirm Password"
//                             className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-mainGreen hover:bg-primary-700 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-zinc-600 focus:outline-none focus:ring-4">
//                         Register
//                     </button>
//                     <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                         Already have an account?{" "}
//                         <span onClick={changeForm} className="text-mainGreen dark:text-primary-500 font-medium hover:underline cursor-pointer">
//                             Sign in
//                         </span>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// }

export default RegisterForm;
