import {createSlice} from "@reduxjs/toolkit";
import { gourmetRecommendsRecipeThunk, gourmetUnrecommendsRecipeThunk, findGourmetWhoRecommendsRecipeThunk } from "./recommendations-thunks";

const initialState = {
    recommendations: [],
    loading: false
}

const recommendationsReducer = createSlice({
    name: 'recommendations',
    initialState,
    extraReducers: {
        [gourmetRecommendsRecipeThunk.fulfilled]: (state, action) => {
            state.recommendation = action.payload
        },
        [gourmetUnrecommendsRecipeThunk.fulfilled]: (state, action) => {
            console.log("unrecommend completed")
        },
        [findGourmetWhoRecommendsRecipeThunk.fulfilled]: (state, action) => {
            state.recommendation = action.payload
        },
    }
})

export default recommendationsReducer.reducer