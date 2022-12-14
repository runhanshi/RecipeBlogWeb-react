import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findIntRecipeBySearchKeyThunk } from "./int-recipe-thunks";
import { Link } from "react-router-dom";
import "./int-reipe-search.css"
const IntRecipeSearch = () => {
    const [searchKey, setSearchKey] = useState('')
    const { recipes } = useSelector((state) => state.int_recipe)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findIntRecipeBySearchKeyThunk(searchKey))
    }, [])

    return (
        <>
            <h1>Recipe Search</h1>
            <ul className="list-group">
                <li className="search-bar list-group-item">
                    <button
                        className=" btn btn-secondary float-end"
                        onClick={() => {
                            dispatch(findIntRecipeBySearchKeyThunk(searchKey))
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
                        <li key={recipe.name} className="search-result list-group-item border  border-2 border-info">
                            <img className="" alt="" src={recipe.picture} height={50} />
                            <Link className="name-font ms-3 " to={`/recipes/${recipe._id}`}>
                                {recipe.name}
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

export default IntRecipeSearch