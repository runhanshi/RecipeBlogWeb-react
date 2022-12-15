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
            <h2 className="mb-2">Thank you {currentUser.username} !</h2>
            <h4 className="font1 font">You just created a recipe for {recipeName}</h4>
            <Link to={`/recipes/${intRecipeID}`} className="">
                View Recipe
            </Link>


        </>
    )
}
export default RecipeCreateSuccess