import {createSlice} from "@reduxjs/toolkit";
import {createReviewThunk, findReviewsByAuthorThunk, findReviewsByMovieThunk} from "./reviews-thunks";

const commentsReducer = createSlice({
    name: 'comments',
    initialState: {
        comments: []
    },
    extraReducers: {
        [createReviewThunk.fulfilled]: (state, action) => {
            state.reviews.push(action.payload)
        },
        [findReviewsByMovieThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
        [findReviewsByAuthorThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        }
    }
})

export default commentsReducer.reducer