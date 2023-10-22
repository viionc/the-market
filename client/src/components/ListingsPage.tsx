import {useDataContext} from "../context/DataContext";
import Listing from "./Listing";
import ListingsSidebar from "./ListingsSidebar";

function ListingsPage() {
    const {listings} = useDataContext();
    return (
        <section className="container w-full flex gap-2">
            <ListingsSidebar />
            <div className="flex flex-col gap-2 w-full p-6">
                {listings.map((listing, index) => {
                    return <Listing key={index} listing={listing} />;
                })}
            </div>
        </section>
    );
}

export default ListingsPage;
