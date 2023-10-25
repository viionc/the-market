import {useRef} from "react";
import {useAuthContext} from "../../context/AuthContext";
import {useClickOutside} from "../../hooks/useClickOutside";

function UserMenu({setShow}: {setShow: () => void}) {
    const {logout} = useAuthContext();
    const ref = useRef(null);
    useClickOutside(ref, setShow);

    return (
        <div
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            className="z-10 absolute top-10 right-0 w-[9rem] pt-2 bg-white items-center border border-mainGreen rounded-sm flex flex-col gap-2">
            <p className="hover:underline cursor-pointer">My Listings</p>
            <div className="border-t p-4 w-full flex justify-center items-center">
                <p className="hover:underline cursor-pointer" onClick={logout}>
                    Logout
                </p>
            </div>
        </div>
    );
}

export default UserMenu;
