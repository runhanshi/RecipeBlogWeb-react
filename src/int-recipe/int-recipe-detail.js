import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router"

import {createRecipeThunk, deleteRecipeThunk, findIntRecipeByIDThunk} from "./int-recipe-thunks";
import RecipeTable from "../ext-recipe/recipe-table";
import {Link} from "react-router-dom";
import {createCommentThunk, findCommentByRecipeThunk} from "../comments/comments-thunks";

const IntRecipeDetails = () => {
    const {intRecipeID} = useParams()
    const {currentUser} = useSelector((state) => state.users)
    const {int_recipe_details} = useSelector((state) => state.int_recipe)
    const {comments} = useSelector((state) => state.comments)
    const [comment, setComment] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findCommentByRecipeThunk(intRecipeID))
        dispatch(findIntRecipeByIDThunk(intRecipeID))
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

    return (
        <>
            <h1>{int_recipe_details.name}</h1>

            {currentUser && (<div>
                Created By
                <Link to={`/profile/${int_recipe_details.chefID}`}> {int_recipe_details.chef}
                </Link>
            </div>)}

            <div className="row">
                <div className="col">
                    <img alt="" src={int_recipe_details.picture} height={500}/>
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
                {JSON.stringify(currentUser, null, 2)}
            </pre>
        </>
    )
}
export default IntRecipeDetails