import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addRecommendation,
    createRecipe,
    deleteRecipe,
    findIntRecipeByID, findIntRecipeBySearchKey,
    removeRecommendation
} from "./int-search-service";

export const createRecipeThunk = createAsyncThunk(
    'createRecipe',
    (int_recipe) => createRecipe(int_recipe)
)

export const addRecommendationThunk = createAsyncThunk(
    'addRecommendation',
    (recommendation) => addRecommendation(recommendation)
)

export const removeRecommendationThunk = createAsyncThunk(
    'removeRecommendation',
    (recipeID) => removeRecommendation(recipeID)
)

export const deleteRecipeThunk = createAsyncThunk(
    'deleteRecipe',
    (recipeID) => deleteRecipe(recipeID)
)

export const findIntRecipeByIDThunk = createAsyncThunk(
    'findIntRecipeByID',
    (recipeID) => findIntRecipeByID(recipeID)
)

export const findIntRecipeBySearchKeyThunk = createAsyncThunk(
    'findIntRecipeBySearchKey',
    (key) => {
        if (key.length === 0) {
            return
        }
        return findIntRecipeBySearchKey(key)
    }
)