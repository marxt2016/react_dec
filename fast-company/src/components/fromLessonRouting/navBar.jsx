import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav">
            <li>
                <Link className="nav-link" to="/">
                    Main
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/users">
                    Users
                </Link>
            </li>
        </ul>
    );
};

export default NavBar;
