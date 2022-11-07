import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;

const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions;

export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested());
    try {
        const { content } = await qualityService.fetchAll();
        dispatch(qualitiesReceved(content));
    } catch (error) {
        dispatch(qualitiesRequestFiled(error.message));
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities && qualitiesIds) {
        console.log(state.qualities.entities);

        const qualitiesArray = [];
        for (let i = 0; i < qualitiesIds.length; i++) {
            for (const quality of state.qualities.entities) {
                if (quality._id === qualitiesIds[0]) {
                    qualitiesArray.push(quality);

                    break;
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};
export default qualitiesReducer;
