import {createSlice} from "@reduxjs/toolkit";
import {createCommentThunk, findCommentByRecipeThunk, findCommentByCustomerThunk} from "./comments-thunks";

const commentsReducer = createSlice({
    name: 'comments',
    initialState: {
        comments: []
    },
    extraReducers: {
        [createCommentThunk.fulfilled]: (state, action) => {
            state.comments.push(action.payload)
        },
        [findCommentByRecipeThunk.fulfilled]: (state, action) => {
            state.comments = action.payload
        },
        [findCommentByCustomerThunk.fulfilled]: (state, action) => {
            state.comments = action.payload
        }
    }
})

export default commentsReducer.reducer