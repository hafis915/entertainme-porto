import "./moviePage.css"
import React, {useEffect} from "react"
import { useHistory } from "react-router-dom";
import Card from "../components/card"
import { GET_MOVIES } from "../config/query"
import { useQuery } from "@apollo/client";


export default function Movie() {
    const {loading,error,data: movies,refetch} = useQuery(GET_MOVIES)
    const history = useHistory()

    useEffect(() => {
        refetch()
    }, [])
    if (loading)  return <h1>Loading...</h1>
    if (error) {
        console.log(error)
        return <h1>{JSON.stringify(error)}</h1>
    }

    return(
        <>
        <div className="main-content">  
            <h4>Movies List</h4>
            <div className="content row">
                {movies.movies.map ( movie =>  {
                    return (
                    <Card 
                    movie = {movie} 
                    key = {movie._id}
                    refetch = {refetch}
                    ></Card>)
                })}
            </div>
            <div className="add-movie-button">
                <button 
                className = "btn btn-primary"
                onClick = {() => {history.push("/addMovie/movie")}}
                > Add New Movies</button>
            </div>
         </div>
        </>
    )
}