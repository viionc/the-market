import axios from "axios";
import {ListingProps, User} from "../types/types";

const API_URL = "/api/listings/";
let isLoading = false;

const addListing = async (listing: ListingProps, token: string) => {
    if (isLoading) return;
    isLoading = true;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, listing, config);

    isLoading = false;
    return response.data;
};

const getListings = async () => {
    if (isLoading) return;
    isLoading = true;

    const response = await axios.get(API_URL);
    isLoading = false;
    return response.data;
};

const purchase = async (user: User, listingId: string) => {
    if (isLoading) return;
    isLoading = true;
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };
    const request = {
        listingId: listingId,
        buyerId: user.id,
    };
    const response = await axios.post(`${API_URL}purchase`, request, config);
    isLoading = false;
    return response;
};

const dataService = {
    addListing,
    getListings,
    purchase,
};

export default dataService;
