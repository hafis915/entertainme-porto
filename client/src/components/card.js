import React from "react"
import { Link } from "react-router-dom";

export default function Card( { movie, refetch } ) {

    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <img src={movie.poster_path} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <Link to= {`/movie/${movie._id}`}>
                    <h5 
                    className="card-title"
                    // onClick = {() => {console.log("masuk")}}
                    >{movie.title}</h5>
                    </Link>
                    {/* <h4>popularity : {movie.popularity}</h4>
                    <h4>Tags : {movie.tags}</h4> */}
                    {/* <button  className="btn btn-primary">More Info</button>
                    <button 
                    className="btn btn-danger"
                    onClick = {() => {handleDelete(movie._id)}}
                    > Delete</button> */}
                </div>
            </div>
        </>
    )
}