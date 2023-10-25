import {useEffect} from "react";
import {useDataContext} from "../../context/DataContext";
import Listing from "./Listing";
import ListingsSidebar from "./ListingsSidebar";
import {ListingProps} from "../../types/types";
import {useParams} from "react-router-dom";

function ListingsPage({data}: {data: ListingProps[]}) {
    const {getListings, filterConfig, getListingsByUserId} = useDataContext();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getListingsByUserId(params.id);
        } else {
            getListings();
        }
    }, []);

    return (
        <section className="container w-full flex gap-2">
            <ListingsSidebar />
            <div className="flex flex-col gap-2 w-full p-6">
                {filterConfig.username && <h1>{filterConfig.username}'s listings.</h1>}
                {filterConfig.category !== "All" && <h1 className="text-2xl">{filterConfig.category}:</h1>}
                {!data.length && filterConfig.title && (
                    <h2>
                        No items called <span className="font-semibold">{filterConfig.title}</span> in this category.
                    </h2>
                )}
                {!data.length && !filterConfig.title && <h2>No items in this category.</h2>}
                {data.length > 0 &&
                    data.map((listing) => {
                        return <Listing key={listing._id} listing={listing} />;
                    })}
            </div>
        </section>
    );
}

export default ListingsPage;
