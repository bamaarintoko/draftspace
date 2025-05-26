// const { default: logger } = require("redux-logger")
import logger from 'redux-logger'
import { Middleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import draftspace from './slice/draftspace'
const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
    // const { logger } = require(`redux-logger`)
    middlewares.push(logger as Middleware)
}

const appReducers = combineReducers({
    draftspace
})

const persistConfig = {
    key: 'draftspace',
    storage: storage,
    whitelist: [
        'draftspace',
    ]
}

const persistedReducer = persistReducer(persistConfig, appReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
        }
    }).concat(
        middlewares)
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;