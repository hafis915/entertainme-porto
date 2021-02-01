import "./card.css"
import React from "react"
import { Link } from "react-router-dom";

export default function Card( { movie, refetch } ) {
    console.log(movie._id)
    return (
        <div className="card card-component col-sm-4" >
            <img 
            src={movie.poster_path} className="card-img-top card-image" 
            alt="card"/>
            <div className="card-body">
                <Link 
                className = "link-card"
                to= {`/movie/${movie._id}`}>
                <h5 
                className="card-title"
                >{movie.title}</h5>
                </Link>
            </div>
        </div>
        
    )
}