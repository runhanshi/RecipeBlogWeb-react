import axios from "axios";

const CUSTOMERS_URL = 'http://localhost:4000/customers'
const RECIPES_URL = 'http://localhost:4000/recipes'
const BASIC_URL = 'http://localhost:4000'



export const customerLikesRecipe = async (cid, rid) => {
    const response = await axios.post(`${CUSTOMERS_URL}/${cid}/likes/${rid}`)
    return response.data
}

export const customerUnLikesRecipe = async (cid, rid) => {
    const response = await axios.delete(`${CUSTOMERS_URL}/${cid}/unlikes/${rid}`)
    return response.data
}

export const findCustomersWhoLikeRecipe = async (rid) => {
    const response = await axios.get(`${RECIPES_URL}/${rid}/likes`)
    return response.data
}

export const findMostRecentTenLikedRecipes = async () => {
    const response = await axios.get(`${BASIC_URL}/recentLikes`)
    return response.data
}

