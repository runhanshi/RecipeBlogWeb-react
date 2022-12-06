import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "./users-thunk";
import {current} from "@reduxjs/toolkit";
import {Navigate} from "react-router";

const Register = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [usertype, setUsertype] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [dateofbirth, setDateofBirth] = useState('')

    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleRegisterBtn = () => {
        const newUser = {username, usertype, firstname,lastname,email,phone, dateofbirth,password}
        dispatch(registerThunk(newUser))
       }

    if(currentUser) {
        return (<Navigate to={'/profile'}/>)
    }

    return(
        <>
            {/*<h1>Register</h1>*/}
            {/*<input*/}
            {/*    onChange={(e) => setUsername(e.target.value)}*/}
            {/*    className="form-control"*/}
            {/*    placeholder="username"*/}
            {/*    value={username}/>*/}
            {/*<input*/}
            {/*    onChange={(e) => setPassword(e.target.value)}*/}
            {/*    className="form-control"*/}
            {/*    placeholder="password"*/}
            {/*    type="password"*/}
            {/*    value={password}/>*/}
            {/*<button*/}
            {/*    className="btn btn-primary w-100"*/}
            {/*    onClick={handleRegisterBtn}>*/}
            {/*    Register*/}
            {/*</button>*/}
            <div className="form_wrapper">
                <h3 className="sign">Sign Up</h3>
                <div className="mb-3">
                    <input
                        type="text"
                        className="un"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="usertypeselect">&nbsp; Please choose your Usertype(select one)</label>
                    <select id="select-usertype" value={usertype} onChange={(e) => {
                        setUsertype(e.target.value )}}>
                        <option defaultValue="CUSTOMER">Customer</option>
                        <option value="Creator">Creator</option>
                        <option value="ADMIN">Admin</option>
                    </select>

                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="un"
                        placeholder="Firstname"
                        value={firstname}
                        onChange={(e) => setFirstname( e.target.value )}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="un"
                        placeholder="Last name"
                        value={lastname}
                        onChange={(e) => setLastname(  e.target.value )}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        className="un"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value )}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="un"
                        placeholder="phonenumber"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value )}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="date"
                        className="un"
                        placeholder="Enter DateOfBirth"
                        value={dateofbirth}
                        onChange={(e) => setDateofBirth(e.target.value )}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="un"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value )}
                    />
                </div>
                <button
                    className="btn btn-primary w-100"
                    onClick={handleRegisterBtn}>
                    Register
                </button>
            </div>
            {
                currentUser &&
                <h1>Welcome new user: {currentUser.username}</h1>
            }
        </>
    )
}
export default Register