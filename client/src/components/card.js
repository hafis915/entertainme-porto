// import "./component.css"
import React from "react"
import { Link } from "react-router-dom";

export default function Card( { movie, refetch } ) {

    return (
        <>
            <div className="card" style={{width: "18rem", marginLeft: "15px"}}>
                <img src={movie.poster_path} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <Link to= {`/movie/${movie._id}`}>
                    <h5 
                    className="card-title"
                    >{movie.title}</h5>
                    </Link>
                </div>
            </div>
        </>
    )
}