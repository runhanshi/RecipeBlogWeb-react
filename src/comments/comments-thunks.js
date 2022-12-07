import {createAsyncThunk} from "@reduxjs/toolkit";
import {createComment, findCommentByRecipe, findCommentByCustomer} from "./comments-service";

export const createCommentThunk = createAsyncThunk(
    'createCommentThunk',
    async (comment) => createComment(comment)
)
export const findCommentByRecipeThunk = createAsyncThunk(
    'findCommentByRecipeThunk',
    async (rid) => findCommentByRecipe(rid)

)
export const findCommentByCustomerThunk = createAsyncThunk(
    'findCommentByCustomerThunk',
    async (cid) => findCommentByCustomer(cid)
)