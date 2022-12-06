import axios from "axios";

const SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const DETAILS_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

export const findRecipeBySearchKey = async (search_key) => {
    const response = await axios.get(`${SEARCH_URL}${search_key}`)
    return response.data.meals
}

export const findRecipeById = async (recipeID) => {
    const response = await axios.get(`${DETAILS_URL}${recipeID}`)
    console.log(response.data.meals[0])
    return response.data.meals[0]
}