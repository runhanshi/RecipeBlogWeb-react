import {useParams} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"

import {createRecipeThunk, deleteRecipeThunk, findIntRecipeByIDThunk} from "./int-recipe-thunks";
import RecipeTable from "../ext-recipe/recipe-table";
import {Link} from "react-router-dom";

const IntRecipeDetails = () => {
    const { intRecipeID } = useParams()
    const { currentUser } = useSelector((state) => state.users)
    const { int_recipe_details } = useSelector((state) => state.int_recipe)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findIntRecipeByIDThunk(intRecipeID))
    }, [])

    const handleDeleteRecipeBtn = () => {
        try {
            const response = dispatch(deleteRecipeThunk(intRecipeID))
            response.then((res) => {
                console.log("delete!")
                navigate('/')
            })
        } catch (e) {
            navigate('/delete-recipe/fail')
        }
    }

    return (
        <>
            {currentUser && (<div>
                Created By
                <Link to={`/profile/${currentUser._id}`}> {currentUser.username}
                </Link>
            </div>)}

            <h1>{int_recipe_details.strMeal}</h1>
            <div className="row">
                <div className="col">
                    <img alt="" src={int_recipe_details.picture} height={500} />
                </div>
            </div>
            <div>
                <h2>Category</h2>
                {int_recipe_details.category}
                <h2>Ingredients</h2>
                <br/>
                <h2>Instructions</h2>
                {int_recipe_details.instructions}
            </div>
            <br/>

            {(currentUser && (currentUser._id === int_recipe_details.chefID)) && (<button
                className="btn btn-primary float-end"
                onClick={handleDeleteRecipeBtn}>Delete
            </button>)}

            <pre>
                {JSON.stringify(int_recipe_details, null, 2)}
            </pre>
        </>
    )
}
export default IntRecipeDetails