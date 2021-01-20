import "./Page.css"
import React from 'react'
import { GET_MOVIES, GET_SERIES } from "../config/query"
import Card from "../components/card"
import { useQuery } from "@apollo/client";

function MainPage () {
    const {loading: movieLoading,error: movieError,data: movies} = useQuery(GET_MOVIES)
    const {loading: seriesLoading, error: seriesError, data: series} = useQuery(GET_SERIES)
    if(movieLoading || seriesLoading) return <h1>Loading...</h1>
    if(movieError || seriesError) return <h2>ERROR</h2>


    return(
        <>
        {/* <p>{JSON.stringify(series.series)}</p> */}
        <div className="main-content">

            {movies.movies.map ( movie => {
                return <Card
                movie = {movie}
                key = {movie._id}

                ></Card>
            })}   
            {series.series.map (serie => {
                return <Card
                movie = {serie}
                key = {series._id}
                ></Card>
            })}
         </div>

        </>
    )
}

export default MainPage