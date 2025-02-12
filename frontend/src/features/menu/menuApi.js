// src/features/api/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This is the authApi created by using RTK Query
export const menuApi = createApi({
    reducerPath: 'menuApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/admin/dashboard',
    }),
    endpoints: (builder) => ({
        fetchMenuItem: builder.query({
            query: () => ({ url: "/menus" })
        }),
    })
})

export const {
    useFetchMenuItemQuery
} = menuApi