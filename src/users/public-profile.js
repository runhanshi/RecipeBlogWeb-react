import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk} from "./users-thunk";
import {Link} from "react-router-dom";
import {findFollowersThunk, findFollowingThunk, followUserThunk} from "../follows/follows-thunks";
import {findRecipeBySearchKeyThunk} from "../ext-recipe/ext-recipe-thunks";
import {findUserById, getMyRecipes} from "./users-service";

const PublicProfile = () => {
    const {uid} = useParams()
    const dispatch = useDispatch()
    const [user, setUser] = useState([]);
    useEffect(() => {
        console.log(uid)
        console.log(typeof uid)
        findUserById(uid).then((res) => {
            console.log("res = ", res);
            setUser(res);
        });
    }, [])
    return(
        <>
            <p>Username: {user.username}</p>
            <p>Firstname: {user.firstname}</p>
            <p>Lastname: {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
        </>
    )
}

export default PublicProfile