import {ReactNode, createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Categories, ListingProps, User} from "../types/types";
import dataService from "../services/DataService";

type DataContext = {
    updateSearchedQuery: (query: string) => void;
    listingsToShow: ListingProps[];
    addListing: (listing: ListingProps, user: User) => Promise<boolean | string>;
    getListings: () => Promise<boolean | string>;
};

type FilterProps = {
    title: string | null;
    category: Categories | null;
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
    const [listings, setListings] = useState<ListingProps[]>([]);
    const [listingsToShow, setListingsToShow] = useState<ListingProps[]>([]);
    const [filterConfig, setFilterConfig] = useState<FilterProps>({
        title: null,
        category: null,
    });
    const navigate = useNavigate();

    const updateSearchedQuery = (query: string) => {
        setFilterConfig((prev) => ({...prev, title: query}));
        // filterListingsByName(query);
        navigate(`/listings/`);
    };

    useEffect(() => {
        setListingsToShow((prev) => {
            const {title, category} = filterConfig;
            let temp = listings;
            if (title) {
                temp = temp.filter((listing) => listing.title.toLowerCase().includes(title.toLowerCase()));
            }
            if (category) {
                temp = temp.filter((listing) => listing.category === category);
            }
            return temp;
        });
    }, [filterConfig, listings]);

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
                setListingsToShow(response);
                return true;
            }
        } catch (error: any) {
            return error.response.data.message;
        }
        return false;
    };

    // const filterListingsByName = (query: string) => {
    //     const _listings = listingsToShow.filter((listing) => listing.title.toLowerCase().includes(query.toLowerCase()));
    //     setListingsToShow(_listings);
    // };

    // const filterListingsByCategory = () => {
    //     const _listings = listingsToShow.filter((listing) => listing.category !== filterConfig.category);
    //     setListingsToShow(_listings);
    // };
    return <DataContext.Provider value={{updateSearchedQuery, addListing, getListings, listingsToShow}}>{children}</DataContext.Provider>;
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
