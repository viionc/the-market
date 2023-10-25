import {categories} from "../../types/constants";
import {useDataContext} from "../../context/DataContext";

function ListingsSidebar() {
    const {updateFilter, filterConfig} = useDataContext();
    return (
        <section className="w-1/5 pt-6">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <label htmlFor="sortBy">Sort by:</label>
                    <select name="sortBy" id="sortBy" className="border h-[2rem]">
                        <option value="price">Price</option>
                        <option value="title">Date created</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Categories:</label>
                    {categories.map((category, index) => (
                        <span
                            key={index}
                            className={`cursor-pointer hover:underline ${filterConfig.category === category ? "font-semibold" : ""}`}
                            onClick={() => updateFilter("category", category)}>
                            {category}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ListingsSidebar;
