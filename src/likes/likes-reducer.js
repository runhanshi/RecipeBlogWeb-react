import {createSlice} from "@reduxjs/toolkit";
import {customerLikesRecipeThunk} from "./likes-thunks";

const initialState = {
    likes: [],
    loading: false
}

export const likesReducer = createSlice({
    name: 'likes',
    initialState,
    extraReducers: {
        [customerLikesRecipeThunk.fulfilled]: (state, action) => {
            state.likes.push(action.payload)
        }
    }
})