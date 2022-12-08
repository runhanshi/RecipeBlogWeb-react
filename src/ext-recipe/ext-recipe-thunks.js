import { createAsyncThunk } from "@reduxjs/toolkit";
import { findRecipeById, findRecipeBySearchKey } from "./ext-seach-service";

export const findRecipeBySearchKeyThunk = createAsyncThunk(
    'findRecipeBySearchKey',
    async (search_key) => {
        if (search_key.length === 0) {
            return
        }
        return findRecipeBySearchKey(search_key)
    }
)
export const findRecipeByIdThunk = createAsyncThunk(
    'findRecipeById',
    (recipeID) => findRecipeById(recipeID)
)