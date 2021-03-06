import "./moviePage.css"
import React, {useEffect} from "react"
import { useHistory } from "react-router-dom";
import Card from "../components/card"
import { GET_SERIES } from "../config/query"
import { useQuery } from "@apollo/client";

export default function Series () {
    const {loading, error, data: series, refetch} = useQuery(GET_SERIES)
    const history = useHistory()

    useEffect(() => {
        refetch()
    }, [])
    if (loading)  return <h1>Loading...</h1>
    if (error) return <h1>{JSON.stringify(error)}</h1>
    
    return (
        <div className="main-content">
            <h4>Series List</h4>
            <div className="content row">

            {series.series.map ( serial =>  {
                return (
                <Card 
                movie = {serial} 
                key = {serial._id}
                refetch = {refetch}
                ></Card>)
            })}
            </div>

            <div className="add-movie-button">
                <button 
                className = 'btn btn-primary'
                onClick = {() => {history.push("/addMovie/series")}}
                > Add Series</button>
            </div>
         </div>
    )
}