import {FormEvent, useState} from "react";
import LoginRegisterWrapper from "./LoginRegisterWrapper";
import {useLocation, useNavigate} from "react-router-dom";
import {useDataContext} from "../../context/DataContext";
import {useAuthContext} from "../../context/AuthContext";
import UserInfoBar from "./UserInfoBar";

function Navbar() {
    const [show, setShow] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const {updateFilter} = useDataContext();
    const {user} = useAuthContext();
    const navigate = useNavigate();

    const handleShow = () => {
        setShow((prev) => !prev);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateFilter("title", search);
    };

    return (
        <header className="relative flex w-full justify-center border-b">
            <nav className="container flex w-full items-center py-4">
                <a className="group text-4xl font-bold w-64 cursor-pointer">
                    <span className="text-black group-hover:text-mainGreen me-1 transition-all ease-in-out duration-500">The</span>
                    <span className="text-mainGreen group-hover:text-black transition-all ease-in-out duration-500" onClick={() => navigate("/")}>
                        Market
                    </span>
                </a>
                <form className="w-full flex justify-center" onSubmit={handleSubmit}>
                    <input
                        className="border w-3/4 h-12 ps-4 border-black rounded-s-sm shadow-md"
                        placeholder="Search an item..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}></input>
                    <button className="border border-s-0 h-12 px-2 border-black hover:bg-mainGreen rounded-e-sm shadow-md font-semibold">
                        Search
                    </button>
                </form>
                <div className="ms-auto flex justify-end w-[25rem]">
                    {!user ? (
                        <button
                            onClick={handleShow}
                            className="bg-mainGreen border-mainGreen rounded-lg px-5 py-2 font-semibold transition text-zinc-600 hover:scale-105 hover:border hover:border-b-4 hover:border-e-4 hover:border-zinc-600 focus:ring-4">
                            Login
                        </button>
                    ) : (
                        <UserInfoBar></UserInfoBar>
                    )}
                </div>
            </nav>

            {!user && <LoginRegisterWrapper show={show} handleShow={handleShow} />}
        </header>
    );
}

export default Navbar;
