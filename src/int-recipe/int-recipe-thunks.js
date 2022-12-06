import { createAsyncThunk } from "@reduxjs/toolkit";
import {createRecipe} from "./int-search-service";

export const createRecipeThunk = createAsyncThunk(
    'createRecipe',
    (int_recipe) => createRecipe(int_recipe)
)