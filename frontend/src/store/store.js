import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi'
import authReducer from '../features/auth/authSlice'
import menuReducer from '../features/menu/menuSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { menuApi } from '../features/menu/menuApi'

// configure the presists
// using local storage for 
const persistConfig = {
    key: 'root',
    storage,
};

// combine reducers and persist the auth reducer
const rootReducer = combineReducers({
    [authApi.reducerPath] : authApi.reducer,
    auth: persistReducer(persistConfig, authReducer),
    [menuApi.reducerPath] : menuApi.reducer,
    menu: persistReducer(persistConfig, menuReducer),
})

// This is the configuration of the store
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false}).concat(authApi.middleware).concat(menuApi.middleware)
})

export const persistor = persistStore(store)