// src/features/api/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This is the authApi created by using RTK Query
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/auth',
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
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useFetchUserQuery
} = authApi