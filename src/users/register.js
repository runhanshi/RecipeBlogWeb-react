import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "./users-thunk";
import {Navigate} from "react-router";
import "./register.css"
import {Link} from "react-router-dom";

const Register = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [usertype, setUsertype] = useState('CUSTOMER')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [dateofbirth, setDateofBirth] = useState('')
    const [password, setPassword] = useState('')
    const time = new Date();
    const dispatch = useDispatch()
    const handleRegisterBtn = () => {
        const newUser = {username, usertype, firstname,lastname,email,phone, dateofbirth,password}
        console.log(newUser)
        dispatch(registerThunk(newUser))
    }

    if(currentUser) {
        return (<Navigate to={'/profile'}/>)
    }

    return(
        <>
            <div className="container_register">
                <div className="screen_register">
                    <div className="form_wrapper_register">
                        <h3 className="register_header">Sign Up</h3>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="un_register"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <select id="select-usertype" className="un_register" value={usertype} onChange={(e) => {
                                setUsertype(e.target.value)}}>
                                <option value="CUSTOMER" selected>Customer</option>
                                <option value="CHEF">I want to be a Chef !</option>
                                <option value="GOURMET">I want to be a Gourmet !</option>
                            </select>

                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="un_register"
                                placeholder="Firstname"
                                value={firstname}
                                onChange={(e) => setFirstname( e.target.value )}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="un_register"
                                placeholder="Lastname"
                                value={lastname}
                                onChange={(e) => setLastname(  e.target.value )}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                className="un_register"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value )}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="un_register"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value )}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="date"
                                className="un_register"
                                placeholder="DateOfBirth"
                                value={dateofbirth}
                                max={(time.toISOString()).slice(0, 10)}
                                onChange={(e) => setDateofBirth(e.target.value )}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="password"
                                className="un_register"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value )}
                            />
                        </div>
                        <button
                            className="registerbtn"
                            onClick={handleRegisterBtn}>
                            Register
                        </button>
                        <Link className="turn_to_login" to={`/login`}>Already Register? Login now!</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register