import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    findFollowing,
    findFollowers,

    customerFollowChef,
    customerUnFollowChef,
    findCustomersWhoFollowChef
} from "./follows-service";
//
// export const followUserThunk = createAsyncThunk(
//     'followUser',
//     async (uid) => await followUser(uid)
// )

export const findFollowersThunk = createAsyncThunk(
    'findFollowers',
    async (followed) => await findFollowers(followed)
)

export const findFollowingThunk = createAsyncThunk(
    'findFollowing',
    async (follower) => await findFollowing(follower)
)

export const customerFollowChefThunk = createAsyncThunk(
    'customerFollowChef',
    async (follow) => {
        return await customerFollowChef(follow.uid, follow.cid)
    }
)

export const customerUnFollowChefThunk = createAsyncThunk(
    'customerUnFollowChef',
    async (unfollow) => {
        return await customerUnFollowChef(unfollow.uid, unfollow.cid)
    }
)

export const findCustomersWhoFollowChefThunk = createAsyncThunk(
    'findCustomersWhoFollowChef',
    async (rid) => {
        return await findCustomersWhoFollowChef(rid)
    }
)