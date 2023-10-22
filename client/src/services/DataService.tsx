import axios from "axios";
import {ListingProps} from "../types/types";

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

const dataService = {
    addListing,
    getListings,
};

export default dataService;
