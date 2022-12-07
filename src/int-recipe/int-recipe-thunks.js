import { createAsyncThunk } from "@reduxjs/toolkit";
import {createRecipe, deleteRecipe, findIntRecipeByID} from "./int-search-service";

export const createRecipeThunk = createAsyncThunk(
    'createRecipe',
    (int_recipe) => createRecipe(int_recipe)
)

export const deleteRecipeThunk = createAsyncThunk(
    'deleteRecipe',
    (recipeID) => deleteRecipe(recipeID)
)

export const findIntRecipeByIDThunk = createAsyncThunk(
    'findIntRecipeByID',
    (recipeID) => findIntRecipeByID(recipeID)
)