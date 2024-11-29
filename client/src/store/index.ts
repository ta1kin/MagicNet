import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import settingsReducer from './slices/settingsSlice'
import singInReducer from './slices/singInSlice'
import singUpReducer from './slices/singUpSlice'
import errorReducer from './slices/errorSlice'
import authReducer from './slices/authSlice'
import recoveryPassReducer from './slices/recoveryPassSlice'
import homeReducer from './slices/homeSlice'
import docsReducer from './slices/docsSlice'
import bookReducer from './slices/bookSlice'


const rootReducer = combineReducers(
    {
        settings: settingsReducer,
        singIn: singInReducer,
        singUp: singUpReducer,
        error: errorReducer,
        auth: authReducer,
        recoveryPass: recoveryPassReducer,
        home: homeReducer,
        docs: docsReducer,
        book: bookReducer,
    }
)

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer( persistConfig, rootReducer )

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore( store )
export default store
