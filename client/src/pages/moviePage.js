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
    if (error) return <h1>{JSON.stringify(error)}</h1>

    return(
        <>
        <div className="main-content">
            <div className="add-movie-button">
                <button 
                onClick = {() => {history.push("/addMovie/movie")}}
                > Add Movies</button>
            </div>
            {movies.movies.map ( movie =>  {
                return (
                <Card 
                movie = {movie} 
                key = {movie._id}
                refetch = {refetch}
                ></Card>)
            })}
         </div>
        </>
    )
}