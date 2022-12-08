import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findMostRecentTenRecommendedRecipesThunk} from "../recommendations/recommendations-thunks";
import {Link} from "react-router-dom";

const Home = () => {
    const {currentUser} = useSelector((state) => state.users)
    const { mostRecentTenRecommendations } = useSelector((state) => state.recommendations)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findMostRecentTenRecommendedRecipesThunk())
    }, [])
    return(
        <>
            <h1>RECIPES</h1>
            {
                currentUser &&
                <h2>Welcome {currentUser.username}, {currentUser.usertype} </h2>
            }

            <h2>Most Recently Recommended</h2>
            <ul className="list-group">
                {
                    mostRecentTenRecommendations && mostRecentTenRecommendations.map((recommendation) =>
                        <li key={recommendation.recipe.name} className="list-group-item">
                            <img alt="" src={recommendation.recipe.picture} height={50} />
                            <Link to={`/recipes/${recommendation.recipe._id}`}>
                                {recommendation.recipe.name}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default Home;