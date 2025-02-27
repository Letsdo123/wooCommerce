// src/features/api/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This is the authApi created by using RTK Query
export const approvalApi = createApi({
    reducerPath: 'approvalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/approval',
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
        createApproval: builder.mutation({
            query: (credentials) => ({
                url: '/user',
                method: 'POST',
                body: credentials
            })
        }),
        getApprovalDetails: builder.mutation({
            query: (credentials) => ({
                url: '/all-approval-details',
                method: 'POST',
                body: credentials
            })
        }),
        processApproval: builder.mutation({
            query: (credentials) => ({
                url: '/process-approval',
                method: 'POST',
                body: credentials
            })
        }),
    })
})

export const {
    useCreateApprovalMutation,
    useGetApprovalDetailsMutation,
    useProcessApprovalMutation
} = approvalApi