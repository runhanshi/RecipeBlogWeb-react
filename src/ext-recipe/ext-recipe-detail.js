import {Navigate, useNavigation, useParams} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"

import {findRecipeByIdThunk} from "./ext-recipe-thunks";
import {createRecipeThunk} from "../int-recipe/int-recipe-thunks";
import RecipeTable from "./recipe-table";

const ExtRecipeDetails = () => {
    const { recipeID } = useParams()
    const { details } = useSelector((state) => state.ext_recipe)
    const { int_recipe_details } = useSelector((state) => state.int_recipe)
    const navigate = useNavigate()

    const { currentUser } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findRecipeByIdThunk(recipeID))
    }, [])
    if (!currentUser || currentUser.usertype !== "Chef") {
        console.log("NOT ALLOWED!!!")
        return (<Navigate to={'/'}/>)
    }
    const ingredientMatrix = [[]]
    let ingredients = []
    let measures = []

    for (var i = 1; i <= 20; i += 1) {
        if (details[`strIngredient${i}`]) {
            let ingredient = details[`strIngredient${i}`]
            let measure = details[`strMeasure${i}`]
            ingredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
            measure = measure.charAt(0).toUpperCase() + measure.slice(1);
            ingredients.push(ingredient)
            measures.push(measure)
            const combine = [ingredient, measure]
            ingredientMatrix.push(combine)
        }
    }

    const handleCreateRecipeBtn = () => {
        try {
            console.log("create recipe")
            const newRecipe =
                {name: details.strMeal,
                    chef: currentUser.username,
                    category: details.strCategory,
                    picture: details.strMealThumb,
                    ingredients: ingredients,
                    measures: measures,
                    extID: recipeID,
                }

                const response = dispatch(createRecipeThunk(newRecipe))
            response.then((res) => {
                console.log("navigate!")
                console.log(details.strMeal)
                navigate(`/create-recipe/success/${res.payload._id}`,
                    {state:
                        {name: details.strMeal}
                    })
            })

        } catch (e) {
            navigate('/create-recipe/fail')
        }
    }

    return (
        <>
            <h1>{details.strMeal}</h1>
            <div className="row">
                <div className="col">
                    <img alt="" src={details.strMealThumb} height={500} />
                </div>
            </div>
            <div>
                <h2>Category</h2>
                {details.strCategory}
                <h2>Ingredients</h2>
                <RecipeTable param={ingredientMatrix}/>
                <br/>
                <h2>Instructions</h2>
                {details.strInstructions}
            </div>
            <br/>

            <button
                className="btn btn-primary float-end"
                onClick={handleCreateRecipeBtn}>Create
            </button>

            <pre>
                {JSON.stringify(details, null, 2)}
            </pre>
        </>
    )
}
export default ExtRecipeDetails