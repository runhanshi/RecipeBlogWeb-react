import {createSlice} from "@reduxjs/toolkit";
import {customerLikesRecipeThunk, findCustomersWhoLikeRecipeThunk, customerUnLikesRecipeThunk} from "./likes-thunks";

const initialState = {
    likes: [],
    loading: false
}

const likesReducer = createSlice({
    name: 'likes',
    initialState,
    extraReducers: {
        [customerLikesRecipeThunk.fulfilled]: (state, action) => {
            state.likes.push(action.payload)
        },
        [customerUnLikesRecipeThunk.fulfilled]: (state, action) => {
            console.log("unlike completed")
        },
        [findCustomersWhoLikeRecipeThunk.fulfilled]: (state, action) => {
            state.likes = action.payload
        },
    }
})

export default likesReducer.reducer