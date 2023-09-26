import React from "react";

const Navbar: React.FC= ()=> {
    const navbarStyle = {
        fontSize: 20,
        height: 60,
      };

    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark" style={navbarStyle}>
            <div className="navbar">
                <div className="container-fluid">
                    <span className="navbar-text text">
                        RPB Week13 Assignment
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar