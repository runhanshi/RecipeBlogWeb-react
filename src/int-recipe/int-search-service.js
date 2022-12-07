import axios from "axios";

const BASE_API_URL = 'http://localhost:4000'

const api = axios.create({withCredentials: true});

export const createRecipe = async (int_recipe) => {
    const response = await api.post(`${BASE_API_URL}/create-recipe`, int_recipe)
    return response.data
}

export const deleteRecipe = async (recipeID) => {
    const response = await api.delete(`${BASE_API_URL}/recipes`, recipeID)
    return response.data
}

export const findIntRecipeByID = async (recipeID) => {
    const response = await api.get(`${BASE_API_URL}/recipes/${recipeID}`, recipeID)
    return response.data
}
