import {useEffect} from "react";
import {useDataContext} from "../../context/DataContext";
import Listing from "./Listing";
import ListingsSidebar from "./ListingsSidebar";

function ListingsPage() {
    const {listingsToShow, getListings, filterConfig} = useDataContext();

    useEffect(() => {
        getListings();
    }, []);

    return (
        <section className="container w-full flex gap-2">
            <ListingsSidebar />
            <div className="flex flex-col gap-2 w-full p-6">
                {filterConfig.category !== "All" && <h1 className="text-2xl">{filterConfig.category}:</h1>}
                {!listingsToShow.length && filterConfig.title && (
                    <h2>
                        No items called <span className="font-semibold">{filterConfig.title}</span> in this category.
                    </h2>
                )}
                {!listingsToShow.length && !filterConfig.title && <h2>No items in this category.</h2>}
                {listingsToShow.length > 0 &&
                    listingsToShow.map((listing) => {
                        return <Listing key={listing._id} listing={listing} />;
                    })}
            </div>
        </section>
    );
}

export default ListingsPage;
