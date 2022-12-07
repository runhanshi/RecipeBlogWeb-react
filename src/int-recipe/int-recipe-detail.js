import {useParams} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"

import {createRecipeThunk, findIntRecipeByIDThunk} from "./int-recipe-thunks";
import RecipeTable from "../ext-recipe/recipe-table";
import {Link} from "react-router-dom";

const IntRecipeDetails = () => {
    const { intRecipeID } = useParams()
    const { int_recipe_details } = useSelector((state) => state.int_recipe)
    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findIntRecipeByIDThunk(intRecipeID))
    }, [])

    const handleDeleteRecipeBtn = () => {
        try {
            console.log("create recipe")
            const newRecipe =
                {}

            const response = dispatch(createRecipeThunk(newRecipe))
            response.then((res) => {
                console.log("navigate!")
                console.log(int_recipe_details.name)
                navigate(`/create-recipe/success/${res.payload._id}`,
                    {state:
                            {name: int_recipe_details.strMeal}
                    })
            })

        } catch (e) {
            navigate('/create-recipe/fail')
        }
    }

    return (
        <>
            Created By
            <Link to={`/profile/${currentUser._id}`}> {currentUser.username}
            </Link>
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

            {(currentUser && currentUser.usertype === "Chef") && (<button
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