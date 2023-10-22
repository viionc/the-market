import {ReactNode, createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ListingProps, User} from "../types/types";
import dataService from "../services/DataService";

type DataContext = {
    searchedQuery: string;
    updateSearchedQuery: (query: string) => void;
    listings: ListingProps[];
    addListing: (listing: ListingProps, user: User) => Promise<boolean | string>;
};

const DataContext = createContext<null | DataContext>(null);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === null) {
        throw new Error("Failed to initialize DataContext.");
    }
    return context;
};

function DataContextProvider({children}: {children: ReactNode}) {
    const [searchedQuery, setSearchedQuery] = useState<string>("");
    const [listings, setListings] = useState<ListingProps[]>([]);
    const navigate = useNavigate();

    const updateSearchedQuery = (query: string) => {
        setSearchedQuery(query);
        navigate(`/listings/`);
        getListings();
    };
    const addListing = async (listing: ListingProps, user: User): Promise<boolean | string> => {
        let response;
        try {
            response = await dataService.addListing(listing, user.token);
            if (response) {
                return true;
            }
        } catch (error: any) {
            return error.response.data.message;
        }
        return false;
    };

    const getListings = async (): Promise<boolean | string> => {
        let response;
        try {
            response = await dataService.getListings();
            if (response) {
                console.log(response);
                setListings(response);
                return true;
            }
        } catch (error: any) {
            return error.response.data.message;
        }
        return false;
    };

    return <DataContext.Provider value={{searchedQuery, updateSearchedQuery, listings, addListing}}>{children}</DataContext.Provider>;
}

export default DataContextProvider;

// const data: ListingProps[] = [
//     {
//         title: "Boots",
//         id: "1",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
//     {
//         title: "Boots2",
//         id: "2",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 90,
//         sellerId: "1",
//     },
//     {
//         title: "Boots3",
//         id: "3",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
//     {
//         title: "Boots4",
//         id: "4",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
//     {
//         title: "Boots5",
//         id: "5",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
//     {
//         title: "Boots6",
//         id: "6",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
//     {
//         title: "Boots7",
//         id: "7",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
//     {
//         title: "Boots8",
//         id: "8",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
//     {
//         title: "Boots9",
//         id: "9",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
//     {
//         title: "Boots10",
//         id: "10",
//         dateCreatedAt: "2021-01-01",
//         originalPrice: 100,
//         description: "This is a boots",
//         image: null,
//         promoPrice: 100,
//         sellerId: "1",
//     },
// ];
