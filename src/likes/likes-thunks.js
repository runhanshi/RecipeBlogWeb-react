import {createAsyncThunk} from "@reduxjs/toolkit";
import {customerLikesRecipe, findCustomersWhoLikeRecipe, customerUnLikesRecipe} from "./likes-service";

export const customerLikesRecipeThunk = createAsyncThunk(
    'customerLikesRecipe',
    async (like) => {
        return await customerLikesRecipe(like.cid, like.rid)
    }
)

export const customerUnLikesRecipeThunk = createAsyncThunk(
    'customerUnLikesRecipe',
    async (unlike) => {
        return await customerUnLikesRecipe(unlike.cid, unlike.rid)
    }
)

export const findCustomersWhoLikeRecipeThunk = createAsyncThunk(
    'findCustomersWhoLikeRecipe',
    async (rid) => {
        return await findCustomersWhoLikeRecipe(rid)
    }
)