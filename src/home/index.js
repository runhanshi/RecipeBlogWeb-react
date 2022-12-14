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
                <h2 id="welcome-text">Welcome {currentUser.usertype}, {currentUser.username} </h2>
            }

            <div className="mb-5">
                {
                    currentUser && (<h2 className="home-subtitle mb-4">Most Recently Recommended Recipes</h2>)
                }

                <div className="row">
                    {
                        currentUser && mostRecentTenRecommendations && mostRecentTenRecommendations.map((recommendation) =>
                            <div className="col-12 col-md-6 col-xl-3 row-box">
                                <div className="card " style={{width: "95%",}}>
                                    <img src={recommendation.recipe.picture} className="card-img-top" alt=""/>
                                    <div className="card-body">
                                        <Link className="recipe-name" style={{ textDecoration: 'none' }}
                                              to={`/recipes/${recommendation.recipe._id}`}>
                                            {recommendation.recipe.name}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mb-5">
                <h2 className="home-subtitle mb-4">Most Recently Liked Recipes</h2>
                <div className="row">
                    {
                        mostRecentLikes && mostRecentLikes.map((like) =>
                            like.recipe.map((recipe) =>
                                <div className="col-12 col-md-6 col-xl-3 row-box">
                                    <div className="card " style={{width: "95%",}}>
                                        <img src={recipe.picture} className="card-img-top" alt=""/>
                                        <div className="card-body">
                                            <Link className="recipe-name" style={{ textDecoration: 'none' }}
                                                  to={`/recipes/${recipe._id}`}>
                                                {recipe.name}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>

            <div className="mb-5">
                <h2 className="home-subtitle mb-4">Most Recently Created Recipes</h2>
                <div className="row">
                    {
                        recentlyCreatedRecipes && recentlyCreatedRecipes.map((recipe) =>
                            <div className="col-12 col-md-6 col-xl-3 row-box">
                                <div className="card " style={{width: "95%",}}>
                                    <img src={recipe.picture} className="card-img-top" alt=""/>
                                    <div className="card-body">
                                        <Link className="recipe-name" style={{ textDecoration: 'none' }}
                                              to={`/recipes/${recipe._id}`}>
                                            {recipe.name}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Home;