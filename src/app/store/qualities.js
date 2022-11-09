import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
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

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 100) {
        return true;
    }
    return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    console.log(dispatch);

    const { lastFetch } = getState().qualities;
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.fetchAll();
            dispatch(qualitiesReceved(content));
        } catch (error) {
            dispatch(qualitiesRequestFiled(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;

export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities && qualitiesIds) {
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
