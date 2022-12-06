import { createSlice } from "@reduxjs/toolkit";
import { findRecipeByIdThunk, findRecipeBySearchKeyThunk } from "./ext-recipe-thunks";

const initialState = {
    recipes: [],
    loading: false,
    details: {}
}

const extRecipeReducer = createSlice({
    name: 'ext_recipe',
    initialState,
    extraReducers: {
        [findRecipeBySearchKeyThunk.fulfilled]: (state, action) => {
            state.recipes = action.payload
        },
        [findRecipeByIdThunk.fulfilled]: (state, action) => {
            state.details = action.payload
        }
    }
})

export default extRecipeReducer.reducer