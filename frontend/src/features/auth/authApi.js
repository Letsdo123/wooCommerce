// src/features/api/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import summaryApi from '../../utils';

// This is the authApi created by using RTK Query
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/auth',
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
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),
        registration: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'PUT'
            })
        }),
        createRole: builder.mutation({
            query: (roleData) => ({
                url: '/add-role',
                method: 'POST',
                body: roleData
            })
        }),
        getRole :builder.query({
            query: () => ({ url: "/get-role" })
        }),
        getUserApproval :builder.query({
            query: () => ({ url: "/get-user-approval" })
        }),
        fetchUser: builder.query({
            query: () => '/me'
        }),
        generateUploadUrl: builder.mutation({
            query: (credentials) => ({
                url: '/generate-upload-url',
                method: 'POST',
                body: credentials
            })
        }),
        retriveUploadUrl: builder.mutation({
            query: (credentials) => ({
                url: '/retrive-upload-url',
                method: 'POST',
                body: credentials
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation,
    useCreateRoleMutation,
    useGetRoleQuery,
    useGetUserApprovalQuery,
    useFetchUserQuery,
    useGenerateUploadUrlMutation,
    useRetriveUploadUrlMutation
} = authApi