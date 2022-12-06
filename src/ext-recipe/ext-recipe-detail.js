import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findRecipeByIdThunk } from "./ext-recipe-thunks";
import { Link } from "react-router-dom";
import RecipeTable from "./recipe-table";

const ExtRecipeDetails = () => {
    const { recipeID } = useParams()
    const { details } = useSelector((state) => state.ext_recipe)
    const { currentUser } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findRecipeByIdThunk(recipeID))
    }, [])
    const ingredientMatrix = [[]]
    for (var i = 1; i <= 20; i += 1) {
        if (details[`strIngredient${i}`]) {
            let ingredient = details[`strIngredient${i}`]
            let measure = details[`strMeasure${i}`]
            ingredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
            measure = measure.charAt(0).toUpperCase() + measure.slice(1);
            const combine = [ingredient, measure]
            ingredientMatrix.push(combine)
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
                <h2>Ingredients</h2>
                <RecipeTable param={ingredientMatrix}></RecipeTable>
            </div>

            <pre>
                {JSON.stringify(details, null, 2)}
            </pre>
        </>
    )
}
export default ExtRecipeDetails