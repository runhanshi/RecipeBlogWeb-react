import { createSlice } from "@reduxjs/toolkit";
import {createRecipeThunk} from "./int-recipe-thunks";


const initialState = {
    recipes: [],
    loading: false,
    int_recipe_details: {}
}

const intRecipeReducer = createSlice({
    name: 'int_recipe',
    initialState,
    extraReducers: {
        [createRecipeThunk.fulfilled]: (state, action) => {
            state.int_recipe_details = action.payload
        },
    }
})

export default intRecipeReducer.reducer