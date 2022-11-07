import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
const rootReducers = combineReducers({ qualities: qualitiesReducer });
export function createStore() {
    return configureStore({
        reducer: rootReducers
    });
}
