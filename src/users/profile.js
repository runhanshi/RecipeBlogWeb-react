import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, updateUserThunk } from "./users-thunk";
import { useNavigate } from "react-router";
import {useEffect, useState} from 'react';
import {getMyFollowedChef, getMyRecipes} from "./users-service";
import { getMyLikes } from "./users-service";
import {Link} from "react-router-dom";
import { getMyRecommends } from "./users-service";
import "./profile.css"

const Profile = () => {
    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.users)
    const [edit, setEdit] = useState(false)
    const [editItem, setEditItem] = useState({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        email: currentUser.email,
        phone: currentUser.phone
    })
    const [recipes, setRecipes] = useState([]);
    const [followChefs, setFollowChefs] = useState([]);
    const [recommends, setRecommends] = useState([]);
    const [likes, setLikes] = useState([]);
    useEffect(() => {
        getMyRecipes().then((res) => {
            console.log("res = ", res);
            setRecipes(res);
        });
        getMyRecommends().then((res) => {
            console.log("res = ", res);
            setRecommends(res);
        });
        getMyLikes().then((res) => {
            console.log("res = ", res);
            setLikes(res);
        });
        getMyFollowedChef().then((res) => {
            console.log("res = ", res);
            setFollowChefs(res);
        });
    }, []);
    const dispatch = useDispatch()
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }
    const handleChange = (field, value) => {
        setEditItem({ ...editItem, [field]: value })
    }
    const handleEditClick = () => {
        setEdit(true)
    }
    const handleEdit = () => {
        dispatch(updateUserThunk({ uid: currentUser._id, body: editItem }))
        setEdit(false)
    }
    console.log(currentUser)
    return (
        <>
            {edit ?
                <div className="row">
                        <div className="mb-3 mt-5 edit-profile-header">
                            <p> Feel free to change your personal information here!</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label edit-profile-label">Current Firstname</label>
                            <br/>
                            <input className="form-control edit-profile-input" id="firstname" value={editItem.firstname} onChange={(e) => handleChange('firstname', e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label edit-profile-label">Current Lastname</label>
                            <br/>
                            <input className="form-control edit-profile-input" id="lastname" value={editItem.lastname} onChange={(e) => handleChange('lastname', e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label edit-profile-label">Current Email</label>
                            <br/>
                            <input type="email" className="form-control edit-profile-input" id="email" value={editItem.email} onChange={(e) => handleChange('email', e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label edit-profile-label">Current Phone</label>
                            <br/>
                            <input type="text" className="form-control edit-profile-input" id="phone" value={editItem.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                        </div>

                        <button
                            className="rounded-pill btn btn-outline-secondary ms-1 w-40 mt-3 fw-bold text-black ps-3 mb-4 pe-3 me-2"
                            onClick={handleEdit}>
                            Save your changes
                        </button>
                </div> :
                <>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-4">
                                    <h1 className="profile-header">Profile</h1>
                                </div>
                                <div className="col-8">
                                    <button
                                        className="rounded-pill btn btn-outline-secondary w-80 ms-5 ps-3 mt-1 fw-bold text-black mb-4 pe-3 me-2"
                                        onClick={handleEditClick}>
                                        Edit your personal information
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    currentUser &&
                                    <>
                                            <div className="col">
                                                <ul className="card mb-4 p-card">
                                                    <div className="row profile-ul mt-3">
                                                        <div className="col-3">
                                                            <label htmlFor="firstname" className="form-label edit-profile-label">Username</label>
                                                        </div>
                                                        <div className="col-9">
                                                            <span className="profile-info">{currentUser.username}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="pp-hr"/>
                                                    <div className="row profile-ul mt-3">
                                                        <div className="col-3">
                                                            <label htmlFor="firstname" className="form-label edit-profile-label">Usertype</label>
                                                        </div>
                                                        <div className="col-9">
                                                            <span className="profile-info">{currentUser.usertype}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="pp-hr"/>
                                                    <div className="row profile-ul mt-3">
                                                        <div className="col-3">
                                                            <label htmlFor="firstname" className="form-label edit-profile-label">Firstname</label>
                                                        </div>
                                                        <div className="col-9">
                                                            <span className="profile-info">{currentUser.firstname}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="pp-hr"/>
                                                    <div className="row profile-ul mt-3">
                                                        <div className="col-3">
                                                            <label htmlFor="firstname" className="form-label edit-profile-label">Lastname</label>
                                                        </div>
                                                        <div className="col-9">
                                                            <span className="profile-info">{currentUser.lastname}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="pp-hr"/>
                                                    <div className="row profile-ul mt-3">
                                                        <div className="col-3">
                                                            <label htmlFor="firstname" className="form-label edit-profile-label">Email</label>
                                                        </div>
                                                        <div className="col-9">
                                                            <span className="profile-info">{currentUser.email}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="pp-hr"/>
                                                    <div className="row profile-ul mt-3">
                                                        <div className="col-3">
                                                            <label htmlFor="firstname" className="form-label edit-profile-label">Phone</label>
                                                        </div>
                                                        <div className="col-9">
                                                            <span className="profile-info">{currentUser.phone}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="pp-hr"/>
                                                    <div className="row profile-ul mt-3">
                                                        <div className="col-3">
                                                            <label htmlFor="firstname" className="form-label edit-profile-label">DateOfBirth</label>
                                                        </div>
                                                        <div className="col-9">
                                                            <span className="profile-info">{currentUser.dateofbirth && currentUser.dateofbirth.slice(0, 10)}</span>
                                                        </div>
                                                    </div>
                                                </ul>
                                                <button
                                                    className="btn btn-danger rounded-pill w-80  mt-1 fw-bold text-black mb-4 pe-3 me-2"
                                                    onClick={handleLogoutBtn}>
                                                    Logout
                                                </button>
                                            </div>
                                    </>
                                }
                            </div>
                        </div>
                    { currentUser.usertype === "CHEF" &&

                        <div className="col-6">
                            {
                                recipes.length == 0 && (
                                    <p className="mt-5 text-success unfollow-text">You have not creat your recipes.</p>
                                )
                            }
                            {
                                recipes.length !== 0 && (
                                    <div style={{padding: "10px 0",}} className="container">
                                        <p className="text-success unfollow-text"> My recipes:</p>
                                        <div className="row">
                                            {recipes.map((v, i) => {
                                                return (
                                                    <div key={i} className="col-xs-8 col-sm-6 col-lg-6 mb-3">
                                                        <Link className="card-recipe-name" to={`/recipes/${v._id}`}>
                                                        <div className="card " style={{width: "100%",}}>
                                                            <img src={v.picture} className="card-img-top" alt="..."/>
                                                            <div className="card-body">

                                                                    {v.name}

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
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }
                    { currentUser.usertype === "GOURMET" &&
                        <div className="col-6">
                            {
                                recommends.length == 0 && (
                                    <p className="mt-5 text-success unfollow-text">You do not have recommendations.</p>
                                )
                            }
                            {
                                recommends.length !== 0 && (
                                    <div style={{padding: "10px 0",}} className="container">
                                        <p className="ms-4 text-success unfollow-text"> My recommendations:</p>
                                        <div className="row ms-3">
                                            {recommends.map((v, i) => {
                                                return (
                                                    <div key={i} className="col-xs-8 col-sm-6 col-lg-6 mb-3">
                                                        <Link className="card-recipe-name" to={`/recipes/${v.recipe._id}`}>
                                                            {v.recipe.name}
                                                        <div className="card" style={{width: "100%",}}>
                                                            <img src={v.recipe.picture} className="card-img-top" alt="..."/>
                                                            <div className="card-body">

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
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }
                    { currentUser.usertype === "CUSTOMER" &&
                        <>
                            <div className="col-6">
                            {
                                likes.length == 0 && (
                                    <p className="mt-5 text-success unfollow-text">You do not have liked recipes.</p>
                                )
                            }
                                {
                                    likes.length !== 0 && (
                                <div style={{padding: "10px 0",}} className="container">
                                    <p className="ms-4 text-success unfollow-text"> My recommendations:</p>
                                    <div className="row ms-3">
                                        {likes.map((v, i) => {
                                            return (
                                                <div key={i} className="col-xs-8 col-sm-6 col-lg-6 mb-3">
                                                    <Link  className="card-recipe-name" to={`/recipes/${v.recipe._id}`}>
                                                    <div className="card" style={{width: "100%",}}>
                                                        <img src={v.recipe.picture} className="card-img-top" alt="..."/>
                                                        <div className="card-body">

                                                                {v.recipe.name}

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
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                    )
                                }
                            </div>
                            <div>
                                <div className="col-6">
                                {
                                    followChefs.length == 0 && (
                                        <p className="mt-5 text-success unfollow-text">Your following list is empty.</p>
                                    )
                                }
                                    {
                                        followChefs.length !== 0 && (
                                            <div style={{padding: "10px 0",}} className="container">
                                                <p className="text-success unfollow-text"> My followed chefs <br/>  Click their name to see the profile:</p>
                                                <div className="row">
                                                    {followChefs.map((v, i) => {
                                                        return (
                                                            <Link className="customer-follow-list" to={`/profile/${v.followed._id}`}>
                                                                <button className="rounded-pill btn btn-outline-secondary w-40 mt-1 fw-bold text-black mb-4 pe-3 me-2 ">
                                                                    {v.followed.username} </button>
                                                            </Link>

                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    }

                            </div>
                            </div>
                        </>

                    }
                    </div>
                </>

            }

        </>
    )
}
export default Profile