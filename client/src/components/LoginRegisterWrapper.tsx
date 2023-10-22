import {useRef, useState} from "react";
import {motion} from "framer-motion";
import {useClickOutside} from "../hooks/useClickOutside";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginRegisterWrapper({show, handleShow}: {show: boolean; handleShow: () => void}) {
    const [formType, setFormType] = useState<"login" | "register">("login");
    const ref = useRef(null);

    useClickOutside(ref, handleShow);

    const changeForm = () => {
        formType === "login" ? setFormType("register") : setFormType("login");
    };

    return (
        show && (
            <motion.div
                ref={ref}
                initial={{top: "48px"}}
                animate={{top: "74px"}}
                transition={{duration: 0.3}}
                className="absolute right-28 mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
                {formType === "login" && <LoginForm changeForm={changeForm} />}
                {formType === "register" && <RegisterForm changeForm={changeForm} />}
            </motion.div>
        )
    );
}

export default LoginRegisterWrapper;
