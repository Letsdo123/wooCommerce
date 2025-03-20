// src/features/api/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This is the authApi created by using RTK Query
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/products/category',
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
        createCategory: builder.mutation({
            query: (credentials) => ({
                url: '/',
                method: 'POST',
                body: credentials
            })
        }),
        getCategoryDetails: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
            })
        }),
    })
})

export const {
    useCreateCategoryMutation,
    useGetCategoryDetailsQuery,
} = categoryApi