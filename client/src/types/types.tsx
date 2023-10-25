export type User = {
    id: string;
    username: string;
    email: string;
    password?: string;
    token: string;
};

export type ListingProps = {
    username: string;
    category: Categories;
    durationInDays: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    originalPrice: number;
    description: string;
    image: FileList | null | string;
    promoPrice: number;
    sellerId: string;
    _id?: string;
};

export type AuthStatus = {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
};
export type Categories =
    | "All"
    | "Antiques"
    | "Art"
    | "Books"
    | "Cameras & Photo"
    | "Cell Phones & Accessories"
    | "Clothing & Shoes & Accessories"
    | "Computers/Tablets & Accessories"
    | "DVDs & Movies"
    | "Gift Cards"
    | "Health & Beauty"
    | "Sports"
    | "Video Games";
