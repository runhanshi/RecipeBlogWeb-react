import { createSlice } from "@reduxjs/toolkit";
import {createRecipeThunk} from "./int-recipe-thunks";


const initialState = {
    recipes: [],
    loading: false,
    details: {}
}

const intRecipeReducer = createSlice({
    name: 'int_recipe',
    initialState,
    extraReducers: {
        [createRecipeThunk.fulfilled]: (state, action) => {
            state.recipes = action.payload
        },
    }
})

export default intRecipeReducer.reducer