import axios from "axios";

const COMMENT_API = 'http://localhost:4000/comments'
const RECIPE_COMMENTS_API = 'http://localhost:4000/recipes'
const CUSTOMER_COMMENTS_API = 'http://localhost:4000/customers'

const api = axios.create({withCredentials: true});

export const createComment = async (comment) => {
    console.log("creating comment...")
    const response = await api.post(COMMENT_API, comment)
    return response.data
}

export const findCommentByRecipe = async (rid) => {
    const response = await api.get(`${RECIPE_COMMENTS_API}/${rid}/comments`)
    return response.data
}

export const findCommentByCustomer = async (cid) => {
    const response = await api.get(`${CUSTOMER_COMMENTS_API}/${cid}/reviews`)
    return response.data
}
