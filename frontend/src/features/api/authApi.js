// src/features/api/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import summaryApi from '../../utils';

// This is the authApi created by using RTK Query
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/auth',
        Credential:true
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query:(credentials)=>({
                url:'/login',
                method: 'POST',
                body: credentials
            })
        }),
        register : builder.mutation({
            query:(userData)=>({
                url:'/register',
                method:'POST',
                body:userData
            })
        }),
        logout: builder.mutation({
            query:()=>({
                url:'/logout',
                method:'POST'
            })
        }),
        fetchUser: builder.query({
            query:()=>'/me'
        }),
        generateUploadUrl: builder.mutation({
            query:(credentials)=>({
                url:'/generate-upload-url',
                method: 'POST',
                body: credentials
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useFetchUserQuery,
    useGenerateUploadUrlMutation
} = authApi