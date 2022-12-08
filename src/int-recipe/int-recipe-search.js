import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findIntRecipeBySearchKeyThunk } from "./int-recipe-thunks";
import { Link } from "react-router-dom";

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
                <li className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
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
                        <li key={recipe.name} className="list-group-item">
                            <img alt="" src={recipe.picture} height={50} />
                            <Link to={`/recipes/${recipe._id}`}>
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