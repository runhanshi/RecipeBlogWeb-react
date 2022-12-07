import {Navigate, useParams} from "react-router";
import { useSelector } from "react-redux";
import {Link, useLocation} from "react-router-dom";

const RecipeCreateSuccess = () => {
    const { intRecipeID } = useParams()
    const { currentUser } = useSelector((state) => state.users)
    const { state } = useLocation();
    const recipeName = state.name
    if (!currentUser || currentUser.usertype !== "Chef") {
        console.log("NOT ALLOWED!!!")
        return (<Navigate to={'/'}/>)
    }

    return (
        <>
            <p>Thank you {currentUser.username}</p>
            <p>You just created a recipe for {recipeName}</p>
            <Link to={'/'}>
                View Recipe: {intRecipeID}
            </Link>

            <pre>
                {JSON.stringify(currentUser, null, 2)}
            </pre>
        </>
    )
}
export default RecipeCreateSuccess