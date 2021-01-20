import "./Page.css"
import React, {useState} from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_MOVIE_BY_ID, DELETE_MOVIE , GET_SERIES_BY_ID, DELETE_SERIES} from "../config/query"

import { favoriteVar } from "../cache"


export default function Detail() {
    const { movieId } = useParams()
    const history = useHistory()

    const {loading :movieLoading, error:movieError, data : movie,refetch} = useQuery(GET_MOVIE_BY_ID, {variables : {id : movieId}})
    const {loading :seriesLoading,error:seriesError, data: series} = useQuery(GET_SERIES_BY_ID, {variables : {id : movieId}})

    const [isFav, setIsFav] = useState(false)
    const [deleteMovie]  = useMutation(DELETE_MOVIE)
    const [deleteSeries]  = useMutation(DELETE_SERIES)

    if(movieLoading || seriesLoading) return <h1>Loading...</h1>
    if(movieError || seriesError) return <h2>ERROR</h2>
    let data

    if(movie.movie) {
        data = movie.movie
    }else {
        data = series.serial
    }
    
    function handleAddFav(params) {
        setIsFav(true)
        console.log(favoriteVar().length, "before")
        if(!favoriteVar().length) {
            favoriteVar([data])
        }else {
            let prevData = [...favoriteVar()]
            prevData = prevData.concat([data])
            favoriteVar(prevData)
        }
    }

    function handleEditButton(id) {
        if(movie.movie) {
            history.push(`/movie/edit/${id}`)
        }else {
            history.push(`/series/edit/${id}`)

        }
    }

    function handleDeleteData(id) {
        console.log(id)
        if(movie.movie) {
            console.log("MASUK SINI")
            deleteMovie({
                variables: { 
                    id: id
                },
                onCompleted : (data => {
                    console.log(data)
                })
            })
            history.push("/movie")
        }else {
            deleteSeries({
                variables: {
                    id: id
                }
            })
            history.push("/series")
        }

    }
    return(
        <>
        <div className="detail-container shadow p-3 mb-5 bg-white rounded">
            <img src={data.poster_path} alt="poster_path"/>
            <div className="info">
                <div className="title shadow-sm p-3 mb-5 bg-white rounded">
                    
                    <h2>{data.title} </h2>
                    <div className="tags">
                    {data.tags.map( tag => {
                            return <small>{tag}</small>
                        })}
                    </div>
                        
                    
                </div>
                <div className="detail-info ">
                    <div className="information-detail">
                        <h5>Overview : {data.overview}</h5>
                        <h5>Popularity : {data.popularity}</h5>
                    </div>
                    <div className="button-detail">
                        {!isFav && 
                        <button
                        onClick= {handleAddFav}
                        >add to favorite</button>
                        }

                        <button 
                        className="btn btn-primary"
                        onClick= {() => {handleEditButton(data._id)}}
                        > Edit</button>



                        <button 
                        className="btn btn-danger"
                        onClick ={() => handleDeleteData(data._id)}
                        > delete</button>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}