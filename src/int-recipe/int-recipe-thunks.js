import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addRecommendation,
    createRecipe,
    deleteRecipe, findIfRecipeExists,
    findIntRecipeByID, findIntRecipeBySearchKey, findTenMostRecentlyCreatedRecipe,
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

export const findTenMostRecentlyCreatedRecipeThunk = createAsyncThunk(
    'findTenMostRecentlyCreatedRecipe',
    () => findTenMostRecentlyCreatedRecipe()
)

export const findIfRecipeExistsThunk = createAsyncThunk(
    'findIfRecipeExists',
    (ext_recipe) => findIfRecipeExists(ext_recipe)
)