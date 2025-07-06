import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', 
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.token;
        
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        
    
        headers.set('Content-Type', 'application/json');
        
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User", "Product", "Order", "Category"], // Fixed typo: "Category" not "Catergory"
    endpoints: () => ({}),
});