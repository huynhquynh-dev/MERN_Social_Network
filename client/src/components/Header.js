import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {

    const navLinks = [
        { label: "Home", icon: "home", path: "/" },
        { label: "Message", icon: "near_me", path: "/message" },
        { label: "Discover", icon: "explore", path: "/discover" },
        { label: "Notify", icon: "favorite", path: "/notify" },
    ];

    const { pathname } = useLocation()
    const isActive = (pn) => {
        if(pn === pathname)
            return 'active';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
            <Link className="navbar-brand" to="/">
                Qudispace
            </Link>

        <div className="menu">
            <ul className="navbar-nav px-2 flex-row">
                {navLinks.map((link, index) => (
                    <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                        <Link className="nav-link" to={link.path}>
                            <span className="material-icons">{link.icon}</span>
                        </Link>
                    </li>
                ))}
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        User
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profile`}>
                            Profile
                        </Link>
                        <Link className="dropdown-item" to="/">
                            Dark mode
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link
                            className="dropdown-item"
                            to="/"
                        >
                            Logout
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
        </nav>
    );
};

export default Header;
