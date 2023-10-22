import CategoriesRow from "./CategoriesRow";
import PopularListingsBanner from "./PopularListingsBanner";

function Home() {
    return (
        <main className="container">
            <CategoriesRow />
            <PopularListingsBanner />
        </main>
    );
}

export default Home;
