import React , {useState, useEffect} from "react"
import {gql, useMutation, useQuery} from "@apollo/client"
import { useHistory, useParams } from "react-router-dom"
import { GET_MOVIE_BY_ID , EDIT_MOVIE} from "../config/query"


export default function EditForm() {
    const { movieId } = useParams()
    const history = useHistory()
    const {loading, error, data : movie} = useQuery(GET_MOVIE_BY_ID, {variables : {id : movieId}})
    const [inputUser, setInputUser] = useState({
        title :  "",
        overview : "",
        poster_path : "",
        popularity : 0,
        tags : []
    })
    const [editMovie] = useMutation(EDIT_MOVIE)

    useEffect(() => {
        console.log(movie)
        console.log("use effect")
        if(movie) {
            setInputUser({
                title : movie.movie.title,
                overview : movie.movie.overview,
                poster_path : movie.movie.poster_path,
                popularity : movie.movie.popularity,
                tags: movie.movie.tags
            })
        }
    }, [movie])

    function handleSubmitForm(e) {
        e.preventDefault()
        console.log(inputUser.tags)
        inputUser.tags = inputUser.tags.split(",")
        console.log(inputUser)
        console.log(movieId)
        editMovie({
            variables:{
                id: movieId,
                editedData : inputUser
            }
        })
        history.push("/movie")
    }

    function handleChange(e) {
        setInputUser({
            ...inputUser,
            [e.target.name] : e.target.value
        })
        // console.log(inputUser)
    }

    if(loading) return <h1>loading...</h1>
    if(error) return <h1>Error</h1>

    return(
        <form onSubmit = {handleSubmitForm}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                onChange = {handleChange} 
                type="text" 
                name= "title"
                value = {inputUser.title}
                className="form-control" 
                aria-describedby="emailHelp" 
                />
            </div>

            <div className="mb-3">
                <label className="form-label">overview</label>
                <input
                onChange = {handleChange} 
                value = {inputUser.overview}

                type="text" 
                className="form-control" 
                name = "overview"
                aria-describedby="emailHelp" 
                />
            </div>

            <div className="mb-3">
                <label  className="form-label">Poster Path</label>
                <input
                type="text" 
                name = "poster_path"
                onChange = {handleChange} 
                value = {inputUser.poster_path}
                className="form-control" 
                aria-describedby="emailHelp" 
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Popularity</label>
                <input
                name = "popularity"
                onChange = {handleChange} 
                value = {inputUser.popularity}
                type="number"
                step = "0.1"
                className="form-control" 
                aria-describedby="emailHelp" 
                placeholder = "0.2"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Tags</label>
                <input
                onChange = {handleChange} 
                value = {`${inputUser.tags}`}
                type="text"
                className="form-control" 
                name = "tags"
                />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
    </form>


    )
}