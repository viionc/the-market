import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContext";
import UserMenu from "./UserMenu";
import {useState} from "react";

function UserInfoBar() {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    return (
        <div className="flex gap-2 items-center">
            <button
                onClick={() => navigate("/listings/add")}
                className="w-[8rem] bg-mainGreen border-mainGreen rounded-lg px-4 py-2 font-semibold transition text-zinc-600 hover:scale-105 hover:border hover:border-b-4 hover:border-e-4 hover:border-zinc-600 focus:ring-4">
                Add Listing
            </button>
            <div className="text-black relative" onClick={() => setShow((prev) => !prev)}>
                <p className="text-2xl cursor-pointer hover:underline">{user?.username}</p>
                {show && <UserMenu setShow={() => setShow((prev) => !prev)} />}
            </div>
        </div>
    );
}

export default UserInfoBar;
