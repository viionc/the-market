import {useNavigate, useParams} from "react-router-dom";
import {useDataContext} from "../../context/DataContext";
import {calculateRemainingTime} from "../../utils/helpers";
import {useAuthContext} from "../../context/AuthContext";
import {toast} from "react-toastify";
import {useEffect} from "react";

function ListingOverview() {
    const params = useParams();
    const {listingsToShow, purchaseListing, getListings, getListingsByUserId} = useDataContext();
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const listing = listingsToShow.find((_listing) => _listing._id === params.id);

    useEffect(() => {
        getListings();
    }, []);

    if (!listing) return <div className="text-4xl py-4 ">Listing with this ID doesn't exist.</div>;

    const price = listing.promoPrice < listing.originalPrice ? listing.promoPrice : listing.originalPrice;

    const handlePurchase = async () => {
        if (!user) return;
        const response = await purchaseListing(user, listing._id as string);
        if (response) {
            toast.success("Succesfuly bought an item.");
            navigate("/listings");
        } else {
            toast.error("Something went wrong.");
        }
    };

    const showSellersListings = async () => {
        getListingsByUserId(listing.sellerId);
        navigate(`/listings/user/${listing.sellerId}`);
    };

    return (
        <section className="container">
            <h1 className="text-4xl p-6 font-semibold">{listing.title}</h1>
            <div className="flex w-full gap-2">
                <div className="min-w-[75%] border border-mainGreen rounded-md shadow-md p-2 min-h-[36rem] whitespace-pre-line">
                    {listing.description}
                </div>
                <div className="w-full border border-mainGreen rounded-md shadow-md p-4 h-[12rem] flex flex-col items-end justify-between">
                    <div className="flex justify-between w-full items-center">
                        <p className="text-gray-400">Ends in: {calculateRemainingTime(listing.durationInDays, listing.createdAt)}</p>
                        <p className="text-2xl">{price}$</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <p>
                            Seller: <span className="cursor-pointer hover:underline font-semibold">{listing.username}</span>
                        </p>
                        <p className="hover:underline cursor-pointer text-sm text-gray-500" onClick={showSellersListings}>
                            Check more items from this user.
                        </p>
                    </div>
                    <button
                        className="bg-mainGreen px-2 py-1 text-xl rounded-md hover:scale-105 active:ring-2 font-semibold"
                        onClick={handlePurchase}>
                        Buy now
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ListingOverview;
