import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findRecipeBySearchKeyThunk } from "./ext-recipe-thunks";
import { Link } from "react-router-dom";
import {Navigate} from "react-router";

const ExtRecipeSearch = () => {
    const [searchKey, setSearchKey] = useState('')
    const { recipes, loading } = useSelector((state) => state.ext_recipe)
    const { currentUser } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findRecipeBySearchKeyThunk(searchKey))
    }, [])
    if (!currentUser || currentUser.usertype !== "Chef") {
        console.log("NOT ALLOWED!!!")
        return (<Navigate to={'/'}/>)
    }
    return (
        <>
            <h1>Recipe Search</h1>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
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
                        <li key={recipe.idMeal} className="list-group-item">
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