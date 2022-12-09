import axios from "axios";
const FOLLOWS_API = 'http://localhost:4000/follows'
const USERS_API = 'http://localhost:4000/users'

const api = axios.create({withCredentials: true});

// export const followUser = async (followedUid) => {
//     const response = await api.post(`${FOLLOWS_API}/${followedUid}`)
//     return response.data
// }

export const findFollowers = async (followed) => {
    const response = await api.get(`${USERS_API}/${followed}/followers`)
    return response.data
}

export const findFollowing = async (follower) => {
    const response = await api.get(`${USERS_API}/${follower}/following`)
    return response.data
}

export const customerFollowChef = async (uid, cid) => {
    const response = await axios.post(`${FOLLOWS_API}/${uid}/follow/${cid}`)
    return response.data
}

export const customerUnFollowChef = async (uid, cid) => {
    const response = await axios.delete(`${FOLLOWS_API}/${uid}/unfollow/${cid}`)
    return response.data
}

export const findCustomersWhoFollowChef = async (rid) => {
    const response = await axios.get(`${FOLLOWS_API}/${rid}/follow`)
    return response.data
}