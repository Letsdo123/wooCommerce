import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi'
import authReducer from '../features/auth/authSlice'
import menuReducer from '../features/menu/menuSlice'
import categoryReducer from '../features/product/categorySlice'
import subcategoryReducer from '../features/product/subcategorySlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { menuApi } from '../features/menu/menuApi'
import { approvalApi } from '../features/approval/approvalApi'
import { categoryApi } from '../features/product/categoryApi'
import { subcategoryApi } from '../features/product/subcategoryApi'

// configure the presists
// using local storage for 
const persistConfig = {
    key: 'root',
    storage,
};

// combine reducers and persist the auth reducer
const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: persistReducer(persistConfig, authReducer),
    [menuApi.reducerPath]: menuApi.reducer,
    menu: persistReducer(persistConfig, menuReducer),
    [approvalApi.reducerPath]: approvalApi.reducer,
    productCategory: persistReducer(persistConfig, categoryReducer),
    [categoryApi.reducerPath]: categoryApi.reducer,
    productSubCategory: persistReducer(persistConfig, subcategoryReducer),
    [subcategoryApi.reducerPath]: subcategoryApi.reducer,
})

// This is the configuration of the store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware).concat(menuApi.middleware).concat(approvalApi.middleware).concat(categoryApi.middleware).concat(subcategoryApi.middleware)
})

export const persistor = persistStore(store)