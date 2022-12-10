import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk, logoutThunk} from "./users-thunk";
import {Link} from "react-router-dom";
import {
    customerFollowChefThunk,
    customerUnFollowChefThunk, findCustomersWhoFollowChefThunk,
    findFollowersThunk,
    findFollowingThunk,
    followUserThunk
} from "../follows/follows-thunks";
import {findRecipeBySearchKeyThunk} from "../ext-recipe/ext-recipe-thunks";
import {findUserById, getMyRecipes} from "./users-service";
import {findCustomersWhoFollowChef} from "../follows/follows-service";

const PublicProfile = () => {
    const {uid} = useParams()
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    // const [follows, setfollows] = useState([]);
    const { currentUser } = useSelector((state) => state.users)
    const { followers } = useSelector((state) => state.follows)
    const dispatch = useDispatch()


    useEffect(() => {
        findUserById(uid).then((res) => {
            console.log("res = ", res);
            setUser(res);
        });
        dispatch(findCustomersWhoFollowChefThunk(uid));
    }, [])
    useEffect(
        () => {
            const arr = followers.filter((v) => {
                return v.follower._id == currentUser._id;
            });
            if (arr.length) {
                setIsFollow(true);
            } else {
                setIsFollow(false);
            }
        },
        [followers]
    );
    const toggleFollowBtn = () => {
        if (isFollow) {
            // unfollow
            setLoading(true)
            try {

                const response = dispatch(
                    customerUnFollowChefThunk({
                        uid: user._id,
                        cid: currentUser._id,
                    })
                );
                response.then((data) => {
                    dispatch(findCustomersWhoFollowChefThunk(uid));
                    setLoading(false)
                });
            } catch (e) {
                setLoading(false)
                console.log("failed to unfollow chef");
            }
        } else {
            // follow
            try {
                const response = dispatch(
                    customerFollowChefThunk({
                        uid: user._id,
                        cid: currentUser._id,
                    })
                );
                response.then((data) => {
                    dispatch(findCustomersWhoFollowChefThunk(uid));
                    setLoading(false)
                });
            } catch (e) {
                console.log("failed to follow chef");
                setLoading(false)
            }
        }
    };
    return(
        <>
            <p>Username: {user.username}</p>
            <p>Firstname: {user.firstname}</p>
            <p>Lastname: {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            {(currentUser) && (currentUser.usertype === "CUSTOMER" && user.usertype === "CHEF") && (
                <div>
                    <h1>s</h1>
                    <button onClick={toggleFollowBtn} disabled={loading || currentUser && currentUser.usertype !== "CUSTOMER"} type="button" className={isFollow ? 'btn btn-danger btn-sm' : 'btn btn-primary btn-sm'}>

                        {isFollow ? "- unFollow" : "+ Follow"}
                    </button>

                </div>
            )}
            {(!currentUser) &&
                <div>
                    <h1>You should login or register before following others.</h1>
                    <Link to={`/login`}>
                        Login
                    </Link>
                    <Link to={`/register`}>
                        Register
                    </Link>
                </div>
            }
        </>

    )
}

export default PublicProfile