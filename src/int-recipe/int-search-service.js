import axios from "axios";

const BASE_API_URL = 'http://localhost:4000'

const api = axios.create({withCredentials: true});

export const createRecipe = async (int_recipe) => {
    const response = await api.post(`${BASE_API_URL}/create-recipe`, int_recipe)
    return response.data
}

export const addRecommendation = async (recommendation) => {
    const response = await api.put(`${BASE_API_URL}/recipes/add-recommendation`, recommendation)
    return response.data
}

export const removeRecommendation = async (recipeID) => {
    const response = await api.put(`${BASE_API_URL}/recipes/remove-recommendation/${recipeID}`, recipeID)
    return response.data
}

export const deleteRecipe = async (recipeID) => {
    const response = await api.delete(`${BASE_API_URL}/recipes/${recipeID}`, recipeID)
    return response.data
}

export const findIntRecipeByID = async (recipeID) => {
    const response = await api.get(`${BASE_API_URL}/recipes/${recipeID}`, recipeID)
    return response.data
}

export const findIntRecipeBySearchKey = async (key) => {
    const response = await api.get(`${BASE_API_URL}/recipes-search/?s=${key}`)
    return response.data
}

export const findTenMostRecentlyCreatedRecipe = async () => {
    const response = await api.get(`${BASE_API_URL}/recentCreation`)
    return response.data
}

