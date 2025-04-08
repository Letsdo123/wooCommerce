// src/features/api/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This is the authApi created by using RTK Query
export const subcategoryApi = createApi({
    reducerPath: 'subcategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/products/subcategory',
        credentials: 'include',
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = getState().auth.user?.accessToken;

            // Exclude Authorization header for login request
            if (token && endpoint !== 'login') {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        createSubCategory: builder.mutation({
            query: (credentials) => ({
                url: '/',
                method: 'POST',
                body: credentials
            })
        }),
        getSubCategoryDetails: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
            })
        }),
    })
})

export const {
    useCreateSubCategoryMutation,
    useGetSubCategoryDetailsQuery,
} = subcategoryApi