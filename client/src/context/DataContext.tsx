import {ReactNode, createContext, useContext, useEffect, useState} from "react";
import {Categories, ListingProps, User} from "../types/types";
import dataService from "../services/DataService";
import {useLocation, useNavigate} from "react-router-dom";

type DataContext = {
    updateFilter: (key: keyof FilterProps, query: string | null) => void;
    listingsToShow: ListingProps[];
    userListingsToShow: ListingProps[];
    addListing: (listing: ListingProps, user: User) => Promise<boolean | string>;
    getListings: () => Promise<boolean | string>;
    purchaseListing: (user: User, listingId: string) => Promise<boolean>;
    getListingsByUserId: (userId: string) => Promise<boolean>;

    filterConfig: FilterProps;
};

type FilterProps = {
    title: string | null;
    category: Categories | null;
    username: string | null;
};
const DataContext = createContext<null | DataContext>(null);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === null) {
        throw new Error("Failed to initialize DataContext.");
    }
    return context;
};
const filter = (filterConfig: FilterProps, data: ListingProps[]) => {
    const {title, category} = filterConfig;
    let temp = data;
    if (title) {
        temp = temp.filter((listing) => listing.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (category && category !== "All") {
        temp = temp.filter((listing) => listing.category === category);
    }
    return temp;
};

function DataContextProvider({children}: {children: ReactNode}) {
    const [listings, setListings] = useState<ListingProps[]>([]);
    const [listingsToShow, setListingsToShow] = useState<ListingProps[]>([]);
    const [userListings, setUserListings] = useState<ListingProps[]>([]);
    const [userListingsToShow, setUserListingsToshow] = useState<ListingProps[]>([]);
    const [filterConfig, setFilterConfig] = useState<FilterProps>({
        title: null,
        category: "All",
        username: null,
    });
    const navigate = useNavigate();
    const location = useLocation();

    const updateFilter = (key: keyof FilterProps, value: string | null) => {
        setFilterConfig((prev) => ({...prev, [key]: value}));
        if (location.pathname === "/") {
            navigate("/listings/");
        }
    };

    useEffect(() => {
        if (filterConfig.username) {
            setUserListingsToshow(() => filter(filterConfig, userListings));
        } else {
            setListingsToShow(() => filter(filterConfig, listings));
        }
    }, [filterConfig, listings, userListings]);

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
                setListings(response);
                setListingsToShow(response);
                return true;
            }
        } catch (error: any) {
            return error.response.data.message;
        }
        return false;
    };

    const purchaseListing = async (user: User, listingId: string): Promise<boolean> => {
        let response;
        try {
            response = await dataService.purchase(user, listingId);
            if (response) {
                await getListings();
                return true;
            }
        } catch (err) {
            console.log(err);
        }
        return false;
    };

    const getListingsByUserId = async (userId: string): Promise<boolean> => {
        let response;
        try {
            response = await dataService.getSellersListings(userId);
            if (response) {
                setUserListings(response.listings);
                filterConfig.username = response.username;
                return true;
            }
        } catch (err) {
            console.log(err);
        }
        return false;
    };

    return (
        <DataContext.Provider
            value={{updateFilter, addListing, getListings, listingsToShow, purchaseListing, filterConfig, getListingsByUserId, userListingsToShow}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;
