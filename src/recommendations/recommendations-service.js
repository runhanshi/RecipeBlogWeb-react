import axios from "axios";

const GOURMETS_URL = 'http://localhost:4000/gourmets'
const RECIPES_URL = 'http://localhost:4000/recipes'


export const gourmetRecommendsRecipe = async (gid, rid) => {
    const response = await axios.post(`${GOURMETS_URL}/${gid}/recommends/${rid}`)
    return response.data
}

export const gourmetUnrecommendsRecipe = async (gid, rid) => {
    const response = await axios.post(`${GOURMETS_URL}/${gid}/unrecommends/${rid}`)
    return response.data
}

export const findGourmetWhoRecommendsRecipe = async (rid) => {
    const response = await axios.get(`${RECIPES_URL}/${rid}/recommends`)
    return response.data
}

