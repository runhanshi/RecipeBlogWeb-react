import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "./users-thunk";
import {Navigate} from "react-router";
import "./login.css"

const Login = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleLoginBtn = () => {
        try {
            dispatch(loginThunk({username, password}))
        } catch (e) {

        }
    }
    if (currentUser) {
        return (<Navigate to={'/profile'}/>)
    }
    return(
        <>
            <div className="container_login">
                <div className="screen_login">
                    <div className="form_wrapper_login">
                        <form className="login">
                            <span className="login_header">Login</span>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control un"
                                placeholder="username"
                                value={username}/>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control un" placeholder="password" type="password" value={password}/>
                            <button
                                className="loginbtn"
                                onClick={handleLoginBtn}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login