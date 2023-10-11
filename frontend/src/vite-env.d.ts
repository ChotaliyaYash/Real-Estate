/// <reference types="vite/client" />

// error type
interface catchErrorType {
    message: string,
    name: string,
    response: errorResponseType
}

interface errorResponseType {
    data: errorDataType,
    status: number,
    statusText: string,
}

interface errorDataType {
    message: string,
    success: boolean,
}

// user state type
interface userStateType {
    error: catchErrorType | null,
    loading: boolean,
    currentUser: userDataType | null
}

// user reponse type
interface userResponseType {
    success: boolean
    message: string
    data: userDataType
}

// User
interface userDataType {
    _id: string
    username: string
    email: string
    avatar: string
    password: string
    createdAt: string
    updatedAt: string
}

// list state type
interface listStateType {
    error: catchErrorType | null,
    loading: boolean,
    listing: listModelType[] | null
}

// list response type
interface listResponseType {
    success: boolean
    message: string
    data: Data
}

// list data type
type listModelType = {
    name: string;
    description: string;
    address: string;
    regularPrice: number;
    discountedPrice: number;
    bathrooms: number;
    bedrooms: number;
    furnished: boolean;
    parking: boolean;
    type: "sell" | "rent";
    offer: boolean;
    imageUrls: string[];
    userRef: string;
}