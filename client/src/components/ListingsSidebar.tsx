import React from "react";

function ListingsSidebar() {
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
            </div>
        </section>
    );
}

export default ListingsSidebar;
