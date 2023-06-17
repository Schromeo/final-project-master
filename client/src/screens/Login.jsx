import { useState, useContext } from "react"
import { AuthContext } from "../App"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../assets/css/signup.css'

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>Log In</h1>
            <div>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={() => navigate("/signup")}>Sign Up</button>
                {/* make call to index.mjs and get user with matching details using "?" query */}
                <button onClick={() => {
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
    )
}