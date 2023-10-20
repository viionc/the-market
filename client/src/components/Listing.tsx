import {ListingProps} from "../context/DataContext";

function Listing({listing}: {listing: ListingProps}) {
    const promo = listing.promoPrice < listing.originalPrice;

    return (
        <div
            key={listing.id}
            className="flex gap-2 w-full border shadow-sm p-4 rounded-md cursor-pointer hover:scale-[101%] transition hover:border-mainGreen relative">
            {promo && (
                <span className="bg-mainGreen text-zinc-600 absolute top-[26%] translate-y-[-50%] -left-2 px-2 -rotate-45 text-center rounded-md text-xl">
                    -{listing.originalPrice - listing.promoPrice}%!
                </span>
            )}
            <div className="w-[80px] h-[80px] border border-mainGreen rounded-md"></div>
            <div className="flex gap-2 flex-col">
                <h2>{listing.title}</h2>
                <p>{listing.originalPrice}</p>
            </div>
        </div>
    );
}

export default Listing;
