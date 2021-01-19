import React from "react"
import { useQuery } from "@apollo/client";
import { GET_FAVORITE } from "../config/query"
import Card from "../components/card"


export default function Favorite() {
    const {loading,error,data:fav} = useQuery(GET_FAVORITE)
    
    if(loading) return <h1>loading</h1>
    if(error) return <h1>{JSON.stringify(error)}</h1>
    return(
        <>
        <div className="main-content">
            
        {fav.favorites.map(movie =>  {
            return <Card movie={movie.movie} key = {movie.movie._id}></Card>           
        })}
        </div>

        </>
    )
}