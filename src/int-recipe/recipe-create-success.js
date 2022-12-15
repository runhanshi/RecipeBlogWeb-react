import {Navigate, useParams} from "react-router";
import { useSelector } from "react-redux";
import {Link, useLocation} from "react-router-dom";
import "./recipe-create-success.css"
const RecipeCreateSuccess = () => {
    const { intRecipeID } = useParams()
    const { currentUser } = useSelector((state) => state.users)
    const { state } = useLocation();
    const recipeName = state.name
    if (!currentUser || currentUser.usertype !== "CHEF") {
        console.log("NOT ALLOWED!!!")
        return (<Navigate to={'/'}/>)
    }

    return (
        <>
            <h2 className="mb-2 mt-4">Thank you {currentUser.username} !</h2>
            <h4 className="font1 mt-4 mb-4">You just created a recipe for {recipeName}</h4>
            <Link to={`/recipes/${intRecipeID}`} className="">
                View Recipe
            </Link>


        </>
    )
}
export default RecipeCreateSuccess