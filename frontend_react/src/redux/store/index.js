import { combineReducers, configureStore } from "@reduxjs/toolkit"
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
import storage from "redux-persist/lib/storage"
import userReducer from "../slices/userSlice"
import cartReducer from "../slices/cartSlice"
// AI Feature Reducers
import aiStylistReducer from "../slices/ai/stylistSlice"
import tryOnReducer from "../slices/ai/tryOnSlice"
import lookBookReducer from "../slices/ai/lookBookSlice"
import moodBoardReducer from "../slices/ai/moodBoardSlice"
import quizReducer from "../slices/ai/quizSlice"

//combining all the reducers
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    aiStylist: aiStylistReducer,
    tryOn: tryOnReducer,
    lookBook: lookBookReducer,
    moodBoard: moodBoardReducer,
    quiz: quizReducer
})

//config the persist
const persistConfig = {
    key: 'root',
    storage
}

//create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)


//create the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

//create the persistor
const persistor = persistStore(store)


export {
    store,
    persistor
}