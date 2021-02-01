import "./detail.css"
import React, {useState} from "react"
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
    console.log(movieId, "ini movie id")

    if(movieLoading || seriesLoading) return <h1>Loading...</h1>
    if(movieError || seriesError) return <h2>ERROR</h2>
    let data
    console.log(movie)
    console.log(series, "<<<<<<<<")

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
        <div className="detail-container">
            <div className="detail-content">
                <div className="detail-image">
                <img 
                src={data.poster_path} alt="poster_path"
                />
                </div>
                <div className="info">
                    <div className="title">
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
                            <FavoriteIcon
                            className = "detail-button"
                            onClick= {handleAddFav}
                            ></FavoriteIcon>
                            }

                            <EditIcon
                            className = "detail-button"
                            onClick= {() => {handleEditButton(data._id)}}
                            ></EditIcon>

                            <DeleteIcon
                            className = "detail-button"
                            onClick ={() => handleDeleteData(data._id)}
                            ></DeleteIcon>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}