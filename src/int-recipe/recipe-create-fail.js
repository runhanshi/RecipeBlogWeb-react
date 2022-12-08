import {Navigate } from "react-router";
import {Link } from "react-router-dom";
import {useSelector} from "react-redux";

const RecipeCreateFail = () => {
    const { currentUser } = useSelector((state) => state.users)
    if (!currentUser || currentUser.usertype !== "CHEF") {
        console.log("NOT ALLOWED!!!")
        return (<Navigate to={'/'}/>)
    }

    return (
        <>
            <p>Failed to create recipe</p>
            <Link to={'/'}>
                Back to Home
            </Link>

            <pre>
                {JSON.stringify(currentUser, null, 2)}
            </pre>
        </>
    )
}
export default RecipeCreateFail