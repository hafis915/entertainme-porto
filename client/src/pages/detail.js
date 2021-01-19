import "./Page.css"
import React, {useState} from "react"
import { useParams, useHistory } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { GET_MOVIE_BY_ID, DELETE_MOVIE } from "../config/query"

import { favoriteVar } from "../cache"


export default function Detail() {
    const { movieId } = useParams()
    const {loading, error, data : movie,refetch} = useQuery(GET_MOVIE_BY_ID, {variables : {id : movieId}})
    const history = useHistory()
    const [isFav, setIsFav] = useState(false)
    const [deleteMovie]  = useMutation(DELETE_MOVIE)

    if(loading) return <h1>Loading...</h1>
    if(error) return <h2>{JSON.stringify(error)}</h2>

    function handleAddFav(params) {
        setIsFav(true)
        console.log(favoriteVar().length, "before")
        if(!favoriteVar().length) {
            favoriteVar([movie])
        }else {
            let prevData = [...favoriteVar()]
            prevData = prevData.concat([movie])
            favoriteVar(prevData)
        }
    }

    function handleDeleteData(id) {
        console.log(id)
        deleteMovie({
            variables: { 
                id: movieId
            },
            onCompleted : (data => {
                console.log(data)
            })
        })
        history.push("/movie")
    }
    return(
        <>
        <div className="detail-container shadow p-3 mb-5 bg-white rounded">
            <img src={movie.movie.poster_path} alt="poster_path"/>
            <div className="info">
                <div className="title shadow-sm p-3 mb-5 bg-white rounded">
                    <h2>{movie.movie.title} (YEAR)</h2>
                    <h5><small>tags 1 , tags 2</small></h5>
                </div>
                <div className="detail-info ">
                    <div className="information-detail">
                        <h5>Overview : {movie.movie.overview}</h5>
                        <h5>Popularity : {movie.movie.popularity}</h5>
                    </div>
                    <div className="button-detail">
                        {!isFav && 
                        <button
                        onClick= {handleAddFav}
                        >add to favorite</button>
                        }

                        <button 
                        className="btn btn-primary"
                        onClick= {() => {history.push(`/movie/edit/${movie.movie._id}`)}}
                        > Edit</button>



                        <button 
                        className="btn btn-danger"
                        onClick ={() => handleDeleteData(movie.movie._id)}
                        > delete</button>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}