import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
    customerFollowChefThunk,
    customerUnFollowChefThunk, findCustomersWhoFollowChefThunk,
} from "../follows/follows-thunks";
import {findUserById, getChefRecipes} from "./users-service";
import "./public-profile.css"

const PublicProfile = () => {
    const {uid} = useParams()
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const { currentUser } = useSelector((state) => state.users)
    const { followers } = useSelector((state) => state.follows)
    const dispatch = useDispatch()
    const [recipes,  setChefRecipes] = useState([]);

    useEffect(() => {
        findUserById(uid).then((res) => {
            console.log("res = ", res);
            setUser(res);
        });
        getChefRecipes(uid).then((res) => {
            console.log("res = ", res);
            setChefRecipes(res);
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
            <div className="row mt-4">
            <div className="col-10 col-lg-6 col-xl-6">
                <p>
                    <h3 className="mt-2 fw-bold font-italic text-success text-content-center">Welcome to {user.username} 's profile!</h3>
                </p>

                    <div className="card mb-4 pp-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">My Username</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-primary mb-0 fw-semibold">{user.username}</p>
                                </div>
                            </div>
                            <hr className="dashed pp-hr"/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">My Usertype</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-primary mb-0 fw-semibold">{user.usertype}</p>
                                    </div>
                                </div>
                        </div>
                        <hr className="dashed pp-hr"/>
                        <img src="data:image/png;base64,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"></img>

            </div>
            </div>
            {(currentUser) && (currentUser.usertype === "CUSTOMER" && user.usertype === "CHEF") && (
                <div className="col-6 mt-4">
                    <Link to={`/profile`}>
                        <button className="rounded-pill btn btn-outline-secondary ms-4 w-40 mt-1 fw-bold text-black ps-3 mb-4 pe-3 me-2 ">
                            Go back to my profile.</button>
                    </Link>
                    <br/>
                    <button onClick={toggleFollowBtn} disabled={loading || currentUser && currentUser.usertype !== "CUSTOMER"}
                            type="button"
                            className={isFollow ? 'btn btn-danger btn-sm ms-4' : 'ms-4 btn btn-primary btn-sm'}>
                        {isFollow ? "- unFollow" : "+ Follow"}
                    </button>

                    {isFollow ? (
                        <p className="ms-4 mt-3 text-success follow-text">
                           Thanks for your following, {currentUser.username}!</p>
                    ) : (
                        <p className="ms-4 mt-3 text-danger unfollow-text">
                            Hi, {currentUser.username}! I'm an excellent chef, follow me!
                            <br/> You'll see my recipes after clicking the [+Follow] !</p>
                    )}

                    { (user.usertype === "CHEF" && isFollow) &&
                        <div>
                            {
                                recipes.length === 0 && (
                                    <div className="chef-no-recipes ms-4 mt-3">
                                        Sorry, {user.username} have not publish their recipes yet. <br/> Coming soon...
                                    </div>
                                )
                            }
                            {
                                recipes.length !== 0 && (
                            <div style={{padding: "10px 0",}} className="container">
                                <p className="ms-4 text-success unfollow-text"> Here is my past recipes! <br/></p>
                                <div className="row ms-3">
                                    {recipes.map((v, i) => {
                                        return (
                                            <div key={i} className="col-xs-6 col-sm-4 col-lg-3">
                                                <div className="card" style={{width: "100%"}}>
                                                    <img src={v.picture} className="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                        <Link className="card-recipe-name" to={`/recipes/${v._id}`}>
                                                            {v.name}
                                                        </Link>
                                                        <div style={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                        }} className="card-text">
                                                            {v.instructions}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                                )
                            }

                        </div>
                    }
                </div>
            )}
            {(!currentUser) &&
                <div className="col-6 mt-5">
                    <p className="ano-login-hint">Join us!
                        <br/> Let's register your account!
                        <br/>
                    </p>
                    <Link to={`/login`}>
                        <button className="rounded-pill btn btn-outline-secondary ano-login-btn w-40 mt-1 fw-bold text-black ps-3 mb-4 pe-3 me-2 ">
                            Login</button>
                    </Link>
                    <Link to={`/register`}>
                        <button className="rounded-pill btn btn-outline-secondary ano-login-btn ms-4 w-40 mt-1 fw-bold text-black ps-3 mb-4 pe-3 me-2 ">
                            Register</button>
                    </Link>
                </div>
            }
            </div>
        </>


    )
}

export default PublicProfile