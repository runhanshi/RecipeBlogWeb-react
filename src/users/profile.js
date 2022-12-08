import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, updateUserThunk } from "./users-thunk";
import { useNavigate } from "react-router";
import { useState } from 'react'

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
            {edit ? <div>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">Firstname</label>
                    <input className="form-control" id="firstname" value={editItem.firstname} onChange={(e) => handleChange('firstname', e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Lastname</label>
                    <input className="form-control" id="lastname" value={editItem.lastname} onChange={(e) => handleChange('lastname', e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={editItem.email} onChange={(e) => handleChange('email', e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="number" className="form-control" id="phone" value={editItem.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleEdit}>
                    Save
                </button>
            </div> :
                <>
                    <h1>Profile</h1>
                    {
                        currentUser &&
                        <>
                            <h2>Welcome new user: {currentUser.username}</h2>
                            <p>Username: {currentUser.username}</p>
                            <p>Usertype: {currentUser.usertype}</p>
                            <p>Firstname: {currentUser.firstname}</p>
                            <p>Lastname: {currentUser.lastname}</p>
                            <p>Email: {currentUser.email}</p>
                            <p>Phone: {currentUser.phone}</p>
                            <p>DateOfBirth: {currentUser.dateofbirth && currentUser.dateofbirth.slice(0, 10)}</p>
                        </>
                    }
                    <button
                        className="btn btn-danger"
                        onClick={handleLogoutBtn}>
                        Logout
                    </button>

                    <button
                        className="btn btn-primary"
                        style={{ marginLeft: 200 }}
                        onClick={handleEditClick}>
                        Edit
                    </button>
                </>

            }
        </>
    )
}
export default Profile