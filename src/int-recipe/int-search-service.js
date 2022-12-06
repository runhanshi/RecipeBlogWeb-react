import axios from "axios";

const USER_API_URL = 'http://localhost:4000/users'
const BASE_API_URL = 'http://localhost:4000'

const api = axios.create({withCredentials: true});

export const createRecipe = async (int_recipe) => {
    const response = await api.post(`${BASE_API_URL}/create-recipe`, int_recipe)
    const newRecipe = response.data
    return newRecipe
}

