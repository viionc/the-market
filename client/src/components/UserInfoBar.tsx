import {useAuthContext} from "../context/AuthContext";
import {useDataContext} from "../context/DataContext";
import {ListingProps} from "../types/types";

function UserInfoBar() {
    const {user} = useAuthContext();
    const {addListing} = useDataContext();

    const add = () => {
        if (!user) return;
        const listing: ListingProps = {
            dateCreatedAt: Date.now(),
            description: "test listing",
            image: "ad",
            originalPrice: 100,
            promoPrice: 100,
            title: "Test Listing",
            username: user.username,
        };
        addListing(listing, user);
    };
    return (
        <div className="flex gap-2 items-center">
            <button
                onClick={add}
                className="w-[8rem] bg-mainGreen border-mainGreen rounded-lg px-4 py-2 font-semibold transition text-zinc-600 hover:scale-105 hover:border hover:border-b-4 hover:border-e-4 hover:border-zinc-600 focus:ring-4">
                Add Listing
            </button>
            <div className="text-black">{user?.username}</div>
        </div>
    );
}

export default UserInfoBar;
