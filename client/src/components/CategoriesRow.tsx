import {categories} from "../types/constants";

function CategoriesRow() {
    return (
        <section className="flex gap-4 pt-2 border-b w-full">
            {categories.map((category, i) => (
                <div key={i} className="w-full text-center hover:underline cursor-pointer">
                    {category}
                </div>
            ))}
        </section>
    );
}

export default CategoriesRow;
