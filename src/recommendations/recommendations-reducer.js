import {createSlice} from "@reduxjs/toolkit";
import {
    gourmetRecommendsRecipeThunk,
    gourmetUnrecommendsRecipeThunk,
    findGourmetWhoRecommendsRecipeThunk,
    findMostRecentTenRecommendedRecipesThunk
} from "./recommendations-thunks";

const initialState = {
    recommendations: [],
    mostRecentTenRecommendations: [],
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
        [findMostRecentTenRecommendedRecipesThunk.fulfilled]: (state, action) => {
            state.mostRecentTenRecommendations = action.payload
        },
    }
})

export default recommendationsReducer.reducer