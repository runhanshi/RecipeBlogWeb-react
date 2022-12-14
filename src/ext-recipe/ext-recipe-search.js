import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findRecipeBySearchKeyThunk } from "./ext-recipe-thunks";
import { Link } from "react-router-dom";
import {Navigate} from "react-router";
import "./ext-recipe-search.css"
const ExtRecipeSearch = () => {
    const [searchKey, setSearchKey] = useState('')
    const { recipes } = useSelector((state) => state.ext_recipe)
    const { currentUser } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findRecipeBySearchKeyThunk(searchKey))
    }, [])
    if (!currentUser || currentUser.usertype !== "CHEF") {
        console.log("NOT ALLOWED!!!")
        return (<Navigate to={'/'}/>)
    }
    return (
        <>
            <h1>Create Recipe</h1>
            <ul className="list-group">
                <li className="list-group-item search-bar">
                    <button
                        className="btn btn-secondary float-end"
                        onClick={() => {
                            dispatch(findRecipeBySearchKeyThunk(searchKey))
                        }}>Search
                    </button>
                    <input
                        className="form-control w-75"
                        onChange={(e) => {
                            setSearchKey(e.target.value)
                        }}
                        value={searchKey} />
                </li>
                {
                    recipes && recipes.map((recipe) =>
                        <li key={recipe.idMeal} className="list-group-item search-result">
                            <img alt="" src={recipe.strMealThumb} height={50} />
                            <Link to={`/create-recipe/${recipe.idMeal}`}>
                                {recipe.strMeal}
                            </Link>
                        </li>
                    )
                }
            </ul>
            <pre>
                {JSON.stringify(recipes, null, 2)}
            </pre>
        </>
    )
}

export default ExtRecipeSearch