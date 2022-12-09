import {createSlice} from "@reduxjs/toolkit";
import {
    customerFollowChefThunk,
    customerUnFollowChefThunk, findCustomersWhoFollowChefThunk,
    findFollowersThunk,
    findFollowingThunk,
    followUserThunk
} from "./follows-thunks";
import {customerFollowChef} from "./follows-service";

const followsReducer = createSlice({
    name: 'follows',
    initialState: {
        following: [],
        followers: []
    },
    extraReducers: {
        // [followUserThunk.fulfilled]: (state, {payload}) => {
        //     state.followers.push(payload)
        // },
        [findFollowersThunk.fulfilled]: (state, {payload}) => {
            state.followers = payload
        },
        [findFollowingThunk.fulfilled]: (state, {payload}) => {
            state.following = payload
        },
        [customerFollowChefThunk.fulfilled]: (state, action) => {
            console.log("follow completed")
            state.followers.push(action.payload)
        },
        [customerUnFollowChefThunk.fulfilled]: (state, action) => {
            console.log("unfollow completed")
        },
        [findCustomersWhoFollowChefThunk.fulfilled]: (state, action) => {
            state.followers = action.payload
        },
    }
})

export default followsReducer.reducer