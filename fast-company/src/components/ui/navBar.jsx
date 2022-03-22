import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    // const { currentUser } = useAuth();
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li>
                        <Link className="nav-link" to="/">
                            Main
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link className="nav-link" to="/users">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
