import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    gourmetRecommendsRecipe,
    gourmetUnrecommendsRecipe,
    findGourmetWhoRecommendsRecipe,
    findMostRecentTenRecommendedRecipes
} from "./recommendations-service";

export const gourmetRecommendsRecipeThunk = createAsyncThunk(
    'gourmetRecommendsRecipe',
    async (recommendation) => {
        return await gourmetRecommendsRecipe(recommendation.gid, recommendation.rid)
    }
)

export const gourmetUnrecommendsRecipeThunk = createAsyncThunk(
    'gourmetUnrecommendsRecipe',
    async (unrecommendation) => {
        return await gourmetUnrecommendsRecipe(unrecommendation.gid, unrecommendation.rid)
    }
)

export const findGourmetWhoRecommendsRecipeThunk = createAsyncThunk(
    'findGourmetWhoRecommendsRecipe',
    async (rid) => {
        return await findGourmetWhoRecommendsRecipe(rid)
    }
)

export const findMostRecentTenRecommendedRecipesThunk = createAsyncThunk(
    'findGourmetWhoRecommendsRecipe',
    async () => {
        return await findMostRecentTenRecommendedRecipes()
    }
)