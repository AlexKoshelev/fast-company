import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        errors: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecived: (state, action) => {
            console.log(state);
            console.log(action);

            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsRecived, professionsRequestFailed } =
    actions;
/* function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 100) {
        return true;
    }
    return false;
} */
export const loadProfessionsList = (store) => async (dispatch) => {
    console.log(dispatch);

    store.dispatch(professionsRequested());
    try {
        const { content } = await professionService.get();
        console.log(content);

        dispatch(professionsRecived(content));
    } catch (error) {
        dispatch(professionsRequestFailed(error.message));
    }
};

export const getProfessions = () => (state) => console.log(state);
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionById = (id) => (state) =>
    state.professions.entities.find((prof) => prof._id === id);

export default professionsReducer;
