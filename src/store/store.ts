import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'

const store = configureStore({
    reducer: productReducer
})

export type storeType = ReturnType<typeof store.getState>
export default store
