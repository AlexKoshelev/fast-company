import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./professions";
const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer
});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};
