import axios from "axios";
import {ListingProps, User} from "../types/types";
const URL_PREFIX = "https://the-market-backend.vercel.app";
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
    const response = await axios.post(URL_PREFIX + API_URL, listing, config);

    isLoading = false;
    return response.data;
};

const getListings = async () => {
    if (isLoading) return;
    isLoading = true;

    const response = await axios.get(URL_PREFIX + API_URL);
    isLoading = false;
    return response.data;
};

const getSellersListings = async (userId: string) => {
    if (isLoading) return;
    isLoading = true;

    const response = await axios.get(`${URL_PREFIX}${API_URL}${userId}`);
    console.log(response);
    isLoading = false;
    console.log(response);
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
    const response = await axios.post(`${URL_PREFIX}${API_URL}purchase`, request, config);
    isLoading = false;
    return response;
};

const dataService = {
    addListing,
    getListings,
    purchase,
    getSellersListings,
};

export default dataService;
