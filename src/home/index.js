import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findMostRecentTenRecommendedRecipesThunk} from "../recommendations/recommendations-thunks";
import {Link} from "react-router-dom";
import {findMostRecentTenLikedRecipesThunk} from "../likes/likes-thunks";

const Home = () => {
    const {currentUser} = useSelector((state) => state.users)
    const { mostRecentTenRecommendations } = useSelector((state) => state.recommendations)
    const { mostRecentLikes } = useSelector((state) => state.likes)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findMostRecentTenRecommendedRecipesThunk())
        dispatch(findMostRecentTenLikedRecipesThunk())

    }, [])
    return(
        <>
            <h1>RECIPES</h1>
            {
                currentUser &&
                <h2>Welcome {currentUser.username}, {currentUser.usertype} </h2>
            }

            <h2>Most Recently Recommended Recipes</h2>
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

            <h2>Most Recently Liked Recipes</h2>
            <ul className="list-group">
                {
                    mostRecentLikes && mostRecentLikes.map((like) =>
                        like.recipe.map((r) =>
                            <li key={r.name} className="list-group-item">
                                <img alt="" src={r.picture} height={50} />
                                <Link to={`/recipes/${r._id}`}>
                                    {r.name}
                                </Link>
                            </li>
                        )
                    )
                }
            </ul>
            <pre>
                {JSON.stringify(mostRecentLikes, null, 2)}
            </pre>
        </>
    )
}

export default Home;