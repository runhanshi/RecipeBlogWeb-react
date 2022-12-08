import axios from "axios";

const CUSTOMERS_URL = 'http://localhost:4000/customers'

export const customerLikesRecipe = async (cid, rid) => {
    const response = await axios.post(`${CUSTOMERS_URL}/${cid}/likes/${rid}`)
    return response.data
}