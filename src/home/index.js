import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findMostRecentTenRecommendedRecipesThunk} from "../recommendations/recommendations-thunks";
import {Link} from "react-router-dom";
import {findMostRecentTenLikedRecipesThunk} from "../likes/likes-thunks";
import {findTenMostRecentlyCreatedRecipeThunk} from "../int-recipe/int-recipe-thunks";
import "./index.css"
const Home = () => {
    const {currentUser} = useSelector((state) => state.users)
    const { mostRecentTenRecommendations } = useSelector((state) => state.recommendations)
    const { mostRecentLikes } = useSelector((state) => state.likes)
    const { recentlyCreatedRecipes } = useSelector((state) => state.int_recipe)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findMostRecentTenRecommendedRecipesThunk())
        dispatch(findMostRecentTenLikedRecipesThunk())
        dispatch(findTenMostRecentlyCreatedRecipeThunk())
    }, [])
    return(
        <>
            {
                currentUser &&
                <h2 id="welcome-text">Welcome {currentUser.username}, {currentUser.usertype} </h2>
            }

            <h2 className="home-subtitle">Most Recently Recommended Recipes</h2>
            <ul className="list-group">
                {
                    mostRecentTenRecommendations && mostRecentTenRecommendations.map((recommendation) =>
                        <li key={recommendation.recipe.name} className="list-group-item bg-light">
                            <img alt="" src={recommendation.recipe.picture} height={50} />
                            <Link to={`/recipes/${recommendation.recipe._id}`}>
                                {recommendation.recipe.name}
                            </Link>
                        </li>
                    )
                }
            </ul>

            <h2 className="home-subtitle">Most Recently Liked Recipes</h2>
            <ul className="list-group">
                {
                    mostRecentLikes && mostRecentLikes.map((like) =>
                        like.recipe.map((r) =>
                            <li key={r.name} className="list-group-item bg-light">
                                <img alt="" src={r.picture} height={50} />
                                <Link to={`/recipes/${r._id}`}>
                                    {r.name}
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>

            <h2 className="home-subtitle">Most Recently Created Recipes</h2>
            <ul className="list-group" >
                {
                    recentlyCreatedRecipes && recentlyCreatedRecipes.map((recipe) =>
                        <li key={recipe.name} className="list-group-item bg-light">
                            <img alt="" src={recipe.picture} height={50} />
                            <Link to={`/recipes/${recipe._id}`}>
                                {recipe.name}
                            </Link>
                        </li>
                    )
                }
            </ul>
            <pre>
                {JSON.stringify(recentlyCreatedRecipes, null, 2)}
            </pre>
        </>
    )
}

export default Home;