import {createAsyncThunk} from "@reduxjs/toolkit";
import {customerLikesRecipe} from "./likes-service";

export const customerLikesRecipeThunk = createAsyncThunk(
    'customerLikesRecipe',
    async (like) => {
        return await customerLikesRecipe(like.cid, like.rid)
    }
)