import React, { useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import fashionarr from "../../items";
import { toast } from "react-toastify";

export default function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log("fashionarr", fashionarr)

    return (
        <nav className="flex flex-row justify-evenly navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" style={{fontSize: '2rem'}} href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <ul className="navbar-nav mr-3 ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                </ul>
                {/* button to navigate to Create Item */}
                {user && user.role === "Seller" && (
                    <button
                        className="btn btn-outline-success my-2 my-sm-0 mr-3"
                        onClick={() => {
                            navigate("/createitem")
                        }}
                    >
                        Upload Product
                    </button>
                )}
                {/* button that will show "Log In" if not signed in, and "Sign U"  */}
                <button onClick={() => {
                    if (user) {
                        navigate("/profile");
                    } else {
                        navigate("/login");
                    }
                }}>
                    {user ? (
                        <FontAwesomeIcon icon={faUserTie} size="2xl"/>
                    ) : (
                        <FontAwesomeIcon icon={faUserSecret} size="2xl" />
                    )}
                </button>
                {user && (
                    <button
                        className="btn btn-outline-red my-2 my-sm-0 ml-3"
                        onClick={() => {
                            setUser(null);
                            toast.success("Logged out successfully!");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}