import { useState, useContext } from "react"
import { AuthContext } from "../App"
import { useNavigate } from "react-router-dom"
import '../assets/css/signup.css'

export default function Signup() {
    const [role, setRole] = useState("")
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return (
        <div>
            {role === "" ? (
                <div>
                    <h1 id="signuph1">Sign Up</h1>
                    <div id="gridthumbs-signup" className="portfolio-grid-overlay grid-wrapper collection-content-wrapper">
                        {["Seller", "Buyer"].map((role) => (
                            <div className="carddiv" onClick={() => setRole(role)}>
                                <div className="carddiv-content">
                                    <img 
                                        alt="cardimg"
                                        src={require(`../images/${role.toLowerCase()}.jpg`)}
                                        // style={{width: "100%", height: "100%", objectPosition: "50% 50%", objectFit: "cover"}}
                                    />
                                    <h3 className="roles">{role}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // this will be signup form
                <div>
                    <h1>Welcome New {role}</h1>
                    <div>
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {/* when we click signup make a call to the express app with /user endpoint */}
                    <button onClick={() => {
                        // fetch to localhost:3001/user
                        fetch("http://localhost:3001/user", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({username, email, password, role})
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                // setuser in authcontext
                                setUser(data)
                                navigate("/")
                            }
                        })
                    }}>
                        Sign Up
                    </button>
                </div>
            )}
        </div>
    )
}