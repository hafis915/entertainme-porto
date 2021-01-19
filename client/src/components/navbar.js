import React from "react"
import { NavLink }  from "react-router-dom"

export default function Navbar () {

    return (
        <>
            <div className="navbar-container shadow-none p-3 mb-5 bg-light rounded">
                <div className="logo-navbar">
                    <NavLink to="/">Logo</NavLink>
                </div>
                <div className="menu-navbar ">
                    <NavLink to ="/movie">
                        Movie
                    </NavLink>

                    <NavLink to ="/series">
                        Series
                    </NavLink>

                    <NavLink to ="/favorite">
                        Favorites
                    </NavLink>


                </div>
            </div>
        </>
    )
}