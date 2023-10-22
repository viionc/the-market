export type User = {
    id: string;
    username: string;
    email: string;
    password?: string;
    token: string;
};

export type ListingProps = {
    username: string;
    title: string;
    dateCreatedAt: number;
    originalPrice: number;
    description: string;
    image: FileList | null | string;
    promoPrice: number;
};

export type AuthStatus = {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
};
