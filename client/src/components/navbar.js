import React from "react"
import "./navbar.css"
import { Link }  from "react-router-dom"
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import SearchIcon from '@material-ui/icons/Search';
import TheatersIcon from '@material-ui/icons/Theaters';
import HdIcon from '@material-ui/icons/Hd';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Navbar () {

    return (
        <div className="navbar-container">
            <div className="left-container">
                <div className="logo-navbar">
                    <Link
                    to ="/"
                    className = "link-navbar"
                    >
                    <MovieCreationIcon
                    style = {{fontSize: 40}}
                    ></MovieCreationIcon>
                    </Link>
                </div>

                {/* <div className="search-navbar">
                        <SearchIcon
                        className = "search-icon"
                        ></SearchIcon>
                        <input type="text" name="" id=""/>
                </div> */}
            </div>
            <div className="center-container">
               <h3>Entertain-me</h3>
            </div>
            <div className="right-container">

                <div className="menu-navbar">
                    <Link
                    className = "link-navbar"
                    to = "/movie"
                    >
                    <TheatersIcon></TheatersIcon>
                    <h4>Movies</h4>
                    </Link>
                </div>
                <div className="menu-navbar">
                    <Link
                    className = "link-navbar"
                    to = "/series"
                    >
                    <HdIcon></HdIcon>
                    <h4>Series</h4>
                    </Link>
                </div>
                <div className="menu-navbar">
                    <Link
                    to = "/favorite"
                    className = "link-navbar"
                    >
                    <FavoriteIcon></FavoriteIcon>
                    <h4>Favorite</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}