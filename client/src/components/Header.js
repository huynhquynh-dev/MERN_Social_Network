import React from "react";

const Header = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <a className="navbar-brand" href="/">
            Qudispace
        </a>

      <div className="menu">
        <ul className="navbar-nav px-2 flex-row">
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
                    <a className="dropdown-item" href="/">
                        Profile
                    </a>
                    <a className="dropdown-item" href="/">
                        Dark mode
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                        className="dropdown-item"
                        href="/"
                    >
                        Logout
                    </a>
                </div>
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
