import {useNavigate} from "react-router-dom";
import {ListingProps} from "../../types/types";
import {calculateRemainingTime} from "../../utils/helpers";

function Listing({listing}: {listing: ListingProps}) {
    const promo = listing.promoPrice < listing.originalPrice;
    const navigate = useNavigate();

    return (
        <div
            className="flex gap-2 w-full border shadow-sm p-4 rounded-md cursor-pointer hover:scale-[101%] transition hover:border-mainGreen relative"
            onClick={() => navigate(`/listings/${listing._id}`)}>
            {promo && (
                <span className="bg-mainGreen text-zinc-600 absolute top-[26%] translate-y-[-50%] -left-2 px-2 -rotate-45 text-center rounded-md text-xl">
                    -{listing.originalPrice - listing.promoPrice}%!
                </span>
            )}
            <div className="w-[80px] h-[80px] border border-mainGreen rounded-md"></div>
            <div className="flex gap-2 w-full">
                <h2 className="capitalize ps-4 w-full text-xl">{listing.title}</h2>
                <div className="flex w-full items-end justify-between flex-col">
                    <p className="text-4xl text-mainGreen">{listing.originalPrice}$</p>
                    <p className="text-gray-400">Ends in: {calculateRemainingTime(listing.durationInDays, listing.createdAt)}</p>
                </div>
            </div>
        </div>
    );
}

export default Listing;
