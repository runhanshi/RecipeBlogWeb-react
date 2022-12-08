import {createSlice} from "@reduxjs/toolkit";
import {
    customerLikesRecipeThunk,
    findCustomersWhoLikeRecipeThunk,
    customerUnLikesRecipeThunk,
    findMostRecentTenLikedRecipesThunk
} from "./likes-thunks";

const initialState = {
    likes: [],
    loading: false,
    mostRecentLikes: [],
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
        [findMostRecentTenLikedRecipesThunk.fulfilled]: (state, action) => {
            state.mostRecentLikes = action.payload
            console.log("...")
            console.log(state.mostRecentLikes)
        },
    }
})

export default likesReducer.reducer