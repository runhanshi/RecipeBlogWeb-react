import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router"

import { addRecommendationThunk,
    deleteRecipeThunk,
    findIntRecipeByIDThunk,
    removeRecommendationThunk } from "./int-recipe-thunks";
import RecipeTable from "../ext-recipe/recipe-table";
import {Link} from "react-router-dom";
import {createCommentThunk, findCommentByRecipeThunk} from "../comments/comments-thunks";
import {
    customerLikesRecipeThunk,
    customerUnLikesRecipeThunk,
    findCustomersWhoLikeRecipeThunk
} from "../likes/likes-thunks";
import {gourmetRecommendsRecipeThunk, gourmetUnrecommendsRecipeThunk} from "../recommendations/recommendations-thunks";

const IntRecipeDetails = () => {
    const {intRecipeID} = useParams()
    const {currentUser} = useSelector((state) => state.users)
    const {int_recipe_details} = useSelector((state) => state.int_recipe)
    const {comments} = useSelector((state) => state.comments)
    const { likes } = useSelector((state) => state.likes)
    const [comment, setComment] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findCommentByRecipeThunk(intRecipeID))
        dispatch(findIntRecipeByIDThunk(intRecipeID))
        dispatch(findCustomersWhoLikeRecipeThunk(intRecipeID))
    }, [])

    const handleCreateCommentBtn = () => {
        const response = dispatch(createCommentThunk({
            comment: comment,
            recipeID: intRecipeID
        }))
        response.then((data) => {
            console.log("commented!")
            setComment('')
        })
    }

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

    const toggleLikeBtn = () => {
        if (!currentUser || currentUser.usertype !== 'CUSTOMER') {
            return
        }
        if (doesCurrentUserLikeRecipe()) {
            // unlike
            try {
                const response = dispatch(customerUnLikesRecipeThunk({
                    cid: currentUser._id,
                    rid: intRecipeID,
                }))
                response.then((data) => {
                    dispatch(findCustomersWhoLikeRecipeThunk(intRecipeID))
                })
            } catch (e) {
                console.log('failed to unlike recipe')
            }
        } else {
            // like
            try {
                const response = dispatch(customerLikesRecipeThunk({
                    cid: currentUser._id,
                    rid: intRecipeID,
                }))
                response.then((data) => {
                    dispatch(findCustomersWhoLikeRecipeThunk(intRecipeID))
                })
            } catch (e) {
                console.log('failed to like recipe')
            }
        }
    }

    const recommendBtn = () => {
        if (!currentUser || currentUser.usertype !== 'GOURMET') {
            return
        }
        try {
            const response1 = dispatch(gourmetRecommendsRecipeThunk({
                gid: currentUser._id,
                rid: intRecipeID,
            }))
            response1.then(() => {
                const response2 = dispatch(addRecommendationThunk({
                    rid: intRecipeID,
                    recommendedByID: currentUser._id,
                    recommendedByName: currentUser.username
                }))
                response2.then(() => {
                    dispatch(findIntRecipeByIDThunk(intRecipeID))
                })
            })
        } catch (e) {
            console.log('failed to recommend recipe')
        }
    }

    const unrecommendBtn = () => {
        if (!currentUser || currentUser.usertype !== 'GOURMET') {
            return
        }
        try {
            const response1 = dispatch(gourmetUnrecommendsRecipeThunk({
                gid: currentUser._id,
                rid: intRecipeID,
            }))
            response1.then(() => {
                const response2 = dispatch(removeRecommendationThunk(intRecipeID))
                response2.then(() => {
                    dispatch(findIntRecipeByIDThunk(intRecipeID))
                })
            })
        } catch (e) {
            console.log('failed to unrecommend recipe')
        }
    }

    const doesCurrentUserLikeRecipe = () => {
        console.log("calling doesCurrentUserLikeRecipe...")
        let liked = false;
        if (!currentUser) {
            return false
        }
        likes.forEach((like) => {
            if (currentUser && like && like.customer._id === currentUser._id) {
                liked = true
            }
        })
        return liked
    }

    const isRecommended = () => {
        console.log("calling isRecommended...")
        let recommended = false;
        console.log(int_recipe_details.recommendedBy)
        if (int_recipe_details.recommendedByID && int_recipe_details.recommendedByID.length > 0) {
            recommended = true
        }
        console.log(recommended)
        return recommended
    }

    const isRecommendedByCurrentUserGourmet = () => {
        console.log("calling isCurrentUserRecommendation...")
        let isMyRecommendation = false;

        if (int_recipe_details && currentUser && int_recipe_details.recommendedByID === currentUser._id) {
            isMyRecommendation = true
        }

        return isMyRecommendation
    }

    return (
        <>
            <h1>{int_recipe_details.name}</h1>

            {currentUser && (
                <div>
                    Created By
                    <Link to={`/profile/${int_recipe_details.chefID}`}> {int_recipe_details.chef}
                    </Link>
                </div>)
            }

            <div className="row">
                <div className="col">
                    <img alt="" src={int_recipe_details.picture} height={500}/>
                </div>
            </div>
            <div>
                <h2>Category</h2>
                {int_recipe_details.category}
                <h2>Ingredients</h2>
                { int_recipe_details &&
                    (<RecipeTable param={int_recipe_details.ingredients}/>)
                }
                <br/>
                <h2>Instructions</h2>
                {int_recipe_details.instructions}
            </div>
            <br/>

            {
                (currentUser && (currentUser.usertype === 'GOURMET') && !isRecommended())
                &&
                (
                    <button
                        className={`btn btn-primary float-end`}
                        onClick={recommendBtn}>Recommend
                    </button>
                )
            }

            {
                (currentUser && (currentUser.usertype === 'GOURMET')
                    && isRecommended() && isRecommendedByCurrentUserGourmet())
                &&
                (
                    <button
                        className={`btn btn-primary float-end`}
                        onClick={unrecommendBtn}>Unrecommend
                    </button>
                )
            }

            {
                (isRecommended() && !isRecommendedByCurrentUserGourmet()) &&
                (
                    <div>
                        Recommended By
                        <Link to={`/profile/${int_recipe_details.recommendedByID}`}>
                            {int_recipe_details.recommendedByName}
                        </Link>
                    </div>
                )
            }

            {
                (!currentUser || (currentUser && (currentUser.usertype === 'CUSTOMER'))) &&
                (<i onClick={toggleLikeBtn}
                className={`bi ${doesCurrentUserLikeRecipe() ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}`}/>)
            }

            <br/>
            <br/>

            {
                (currentUser && (currentUser._id === int_recipe_details.chefID)) && (
                    <button
                        className="btn btn-primary float-end"
                        onClick={handleDeleteRecipeBtn}>Delete
                    </button>)
            }

            {
                (currentUser && (currentUser.usertype === 'CUSTOMER')) &&
                <div>
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"/>
                    <button onClick={handleCreateCommentBtn}>Comment</button>
                </div>
            }

            <br/>

            <ul className="list-group">
                {
                    comments.map((comment) =>
                        <li className="list-group-item">
                            {comment.comment}
                            <Link to={`/profile/${comment.customer._id}`} className="float-end">
                                {comment.customer.username}
                            </Link>
                        </li>
                    )
                }
            </ul>

            <pre>
                {JSON.stringify(int_recipe_details, null, 2)}
            </pre>
        </>
    )
}
export default IntRecipeDetails