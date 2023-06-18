import { useState, useContext } from "react"
import { AuthContext } from "../App"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import '../assets/css/login.css'

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            
            <h1 className="h1s">Log In</h1>
            <div className="globaldiv row text1" >
                
                <div className="globaldiv col-3">
                <div className='labeldiv'>              
                        <label>E-mail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="text" placeholder="example@email.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='labeldiv'>              
                        <label>Password&nbsp;&nbsp;</label>
                        <input className="" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                
                <div className="pl-xl-5">
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => navigate("/signup")}>Sign Up</button>
                {/* make call to index.mjs and get user with matching details using "?" query */}
                <button className="btn btn-outline-success my-2 my-sm-0 ml-xl-5" onClick={() => {
                    // pass {email, password} to index.mjs on local
                    fetch("http://localhost:3001/user?email=" + email + "&password=" + password, {
                        method: "GET",
                        headers: {"Content-Type": "application/json"}
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                setUser(data);
                                toast.success("Logged in successfully", {
                                    position: toast.POSITION.TOP_CENTER,
                                    colored: true,
                                })
                                navigate("/")
                            } else {
                                toast.error("Invalid email or password")
                            }
                        })
                        .catch(err => toast.error("Invalid email or password"))
                }}>
                    Log In
                </button>
            </div>
                </div>
                <div className="col-8">
                <img id="loginpic" className="carddiv" src={require(`../images/lion_head.png`) }
                        alt="log in pic"
                    />
                </div>

                
            </div>
            
        </div>
    )
}