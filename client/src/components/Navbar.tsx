import {FormEvent, useEffect, useState} from "react";
import LoginRegisterWrapper from "./LoginRegisterWrapper";
import {useSearchParams} from "react-router-dom";
import {useDataContext} from "../context/DataContext";
import {useAuthContext} from "../context/AuthContext";
import UserInfoBar from "./UserInfoBar";

function Navbar() {
    const [show, setShow] = useState<boolean>(false);
    const {updateSearchedQuery} = useDataContext();
    const {user} = useAuthContext();

    const handleShow = () => {
        setShow((prev) => !prev);
    };

    const [searchParams, setSearchParams] = useSearchParams({q: ""});
    const value = searchParams.get("q") || "";

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const query = searchParams.get("q");
        if (!query || query.length < 3) {
            return;
        }
        updateSearchedQuery(query);
    };

    return (
        <header className="relative flex w-full justify-center border-b">
            <nav className="container flex w-full items-center py-4">
                <h1 className="text-4xl font-bold w-64">
                    The <span className="text-mainGreen">Market</span>
                </h1>
                <form className="w-full flex justify-center" onSubmit={handleSubmit}>
                    <input
                        className="border w-3/4 h-12 ps-4 border-black rounded-s-sm shadow-md"
                        placeholder="Search an item..."
                        value={value}
                        onChange={(e) =>
                            setSearchParams(
                                (prev) => {
                                    prev.set("q", e.target.value);
                                    return prev;
                                },
                                {replace: true}
                            )
                        }></input>
                    <button className="border border-s-0 h-12 px-2 border-black hover:bg-mainGreen rounded-e-sm shadow-md">Search</button>
                </form>
                <div className="ms-auto">
                    {!user ? (
                        <button
                            onClick={handleShow}
                            className="w-24 bg-mainGreen border-mainGreen rounded-lg px-5 py-2 font-semibold transition text-zinc-600 hover:scale-105 hover:border hover:border-b-4 hover:border-e-4 hover:border-zinc-600 focus:ring-4">
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
