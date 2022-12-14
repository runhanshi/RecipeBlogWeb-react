import {Navigate, useNavigation, useParams} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"

import {findRecipeByIdThunk} from "./ext-recipe-thunks";
import {createRecipeThunk, findIfRecipeExistsThunk} from "../int-recipe/int-recipe-thunks";
import RecipeTable from "./recipe-table";
import "./ext-recipe-detail.css"
const ExtRecipeDetails = () => {
    const { recipeID } = useParams()
    const { details } = useSelector((state) => state.ext_recipe)
    const { recipeExistence } = useSelector((state) => state.int_recipe)
    const navigate = useNavigate()

    const { currentUser } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findRecipeByIdThunk(recipeID))
        dispatch(findIfRecipeExistsThunk(recipeID))
    }, [])
    if (!currentUser || currentUser.usertype !== "CHEF") {
        console.log("NOT ALLOWED!!!")
        return (<Navigate to={'/'}/>)
    }

    let ingredientMatrix = []
    let ingredients = []
    let measures = []

    for (var i = 1; i <= 20; i += 1) {
        if (details[`strIngredient${i}`]) {
            let ingredient = details[`strIngredient${i}`]
            let measure = details[`strMeasure${i}`]
            if (ingredient.length !== 0 || measure.length !== 0) {
                ingredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
                measure = measure.charAt(0).toUpperCase() + measure.slice(1);
                ingredients.push(ingredient)
                measures.push(measure)
                let combine = [ingredient, measure]
                ingredientMatrix.push(combine)
            }
        }
    }
    const handleCreateRecipeBtn = () => {
        try {
            console.log("create recipe")
            const newRecipe = {name: details.strMeal,
                chefID: currentUser._id,
                chef: currentUser.username,
                category: details.strCategory,
                picture: details.strMealThumb,
                ingredients: ingredientMatrix,
                extID: recipeID,
                instructions: details.strInstructions,
                recommendedByID: "",
                recommendedByName: "",
                createTime: new Date(),
            };
            const response = dispatch(createRecipeThunk(newRecipe));
            response.then((data) => {
                navigate(`/create-recipe/success/${data.payload._id}`,
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
            {
                (currentUser && (currentUser.usertype === 'CHEF')
                    && (recipeExistence) && (!recipeExistence.existence))
                &&
                (<button
                    className="btn btn-primary float-end"
                    onClick={handleCreateRecipeBtn}>Create
                </button>)
            }

            {
                (currentUser && (currentUser.usertype === 'CHEF')
                    && (recipeExistence) && (recipeExistence.existence))
                &&
                (<p className="">Recipe Already Exists</p>)
            }
            <h1 className="aaa edit-label mb-3">{details.strMeal}</h1>
            <div className="row">
                <div className="col">
                    <img alt="" class=" rounded-4 mt-2 mb-2 pic1" src={details.strMealThumb} height={500} />
                </div>
            </div>
            <div>
                <h2 className="edit-label mt-5">Category</h2>
                <p className="">
                    {details.strCategory}
                </p>

                <h2 className="edit-label mt-5">Ingredients</h2>
                <RecipeTable param={ingredientMatrix}/>
                <br/>
                <h2 className="edit-label mt-5">Instructions</h2>
                <p className="">{details.strInstructions}</p>
            </div>
            <br/>




        </>
    )
}
export default ExtRecipeDetails