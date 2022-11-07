import { createSlice } from "@reduxjs/toolkit";
const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true
    }
});
const { reducer: professionsReducer } = professionsSlice;
export default professionsReducer;
