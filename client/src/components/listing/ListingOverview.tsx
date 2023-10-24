import {useParams} from "react-router-dom";
import {useDataContext} from "../../context/DataContext";
import {calculateRemainingTime} from "../../utils/helpers";
import {useAuthContext} from "../../context/AuthContext";
import dataService from "../../services/DataService";

function ListingOverview() {
    const params = useParams();
    const {listingsToShow} = useDataContext();
    const {user} = useAuthContext();
    const listing = listingsToShow.find((_listing) => _listing._id === params.id);
    if (!listing) return <div className="text-4xl py-4 ">Listing with this ID doesn't exist.</div>;

    const price = listing.promoPrice < listing.originalPrice ? listing.promoPrice : listing.originalPrice;

    const handlePurchase = async () => {
        if (!user) return;
        try {
            const response = await dataService.purchaseListing(user, listing);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="container">
            <h1 className="text-4xl p-6 font-semibold">{listing.title}</h1>
            <div className="flex w-full gap-2">
                <div className="min-w-[75%] border border-mainGreen rounded-md shadow-md p-2">{listing.description}</div>
                <div className="w-full border border-mainGreen rounded-md shadow-md p-4 h-[12rem] flex flex-col items-end justify-between">
                    <div className="flex justify-between w-full items-center">
                        <p className="text-gray-400">Ends in: {calculateRemainingTime(listing.durationInDays, listing.createdAt)}</p>
                        <p className="text-2xl">{price}$</p>
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
