import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

const Home = () => {
    const {currentUser} = useSelector((state) => state.users)
    return(
        <>
            <h1>RECIPES</h1>
            {
                currentUser &&
                <h2>Welcome {currentUser.username}, {currentUser.usertype} </h2>
            }
        </>
    )
}

export default Home;