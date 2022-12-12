import { createSlice } from "@reduxjs/toolkit";
import {
    createRecipeThunk,
    findIntRecipeByIDThunk,
    deleteRecipeThunk,
    addRecommendationThunk,
    removeRecommendationThunk,
    findIntRecipeBySearchKeyThunk,
    findTenMostRecentlyCreatedRecipeThunk, findIfRecipeExistsThunk
} from "./int-recipe-thunks";


const initialState = {
    recipes: [],
    loading: false,
    int_recipe_details: {},
    recentlyCreatedRecipes: [],
    recipeExistence: {},
}

const intRecipeReducer = createSlice({
    name: 'int_recipe',
    initialState,
    extraReducers: {
        [createRecipeThunk.fulfilled]: (state, action) => {
            state.int_recipe_details = action.payload
        },
        [addRecommendationThunk.fulfilled]: (state, action) => {
            state.int_recipe_details = action.payload
        },
        [removeRecommendationThunk.fulfilled]: (state, action) => {
            state.int_recipe_details = action.payload
        },
        [findIntRecipeByIDThunk.fulfilled]: (state, action) => {
            state.int_recipe_details = action.payload
        },
        [deleteRecipeThunk.fulfilled]: (state, action) => {
            state.int_recipe_details = action.payload
        },
        [findIntRecipeBySearchKeyThunk.fulfilled]: (state, action) => {
            state.recipes = action.payload
        },
        [findTenMostRecentlyCreatedRecipeThunk.fulfilled]: (state, action) => {
            state.recentlyCreatedRecipes = action.payload
        },
        [findIfRecipeExistsThunk.fulfilled]: (state, action) => {
            console.log("...")
            console.log(state.recipeExistence.existence)
            state.recipeExistence = action.payload
        },
    }
})

export default intRecipeReducer.reducer