import React , {useState, useEffect} from "react"
import {gql, useMutation, useQuery} from "@apollo/client"
import { useHistory, useParams } from "react-router-dom"

const EDIT_MOVIE = gql `
    mutation EditMovie($id: ID!, $editedData: newData){
        editMovie(id : $id, editedData : $editedData){
            title
        }
    }
`
const GET_MOVIE_BY_ID = gql`
    query GetMovieById($id: ID!) {
        movie(id: $id){
            _id
            title
            poster_path
            overview
            popularity
        }
    }
`

export default function EditForm() {
    const { movieId } = useParams()
    const {loading, error, data : movie} = useQuery(GET_MOVIE_BY_ID, {variables : {id : movieId}})
    const [inputUser, setInputUser] = useState({
        title : "",
        overview : "",
        poster_path : "",
        popularity : 0,
        // tags : ['coba 1', 'coba 2']
    })

    useEffect(()=> {
        let newData = {
            title : "",
            overview : "",
            poster_path : "",
            popularity : 0,
        }
        if(!loading) {
            newData = {
                title: movie.movie.title,
                overview : movie.movie.overview,
                poster_path : movie.movie.poster_path,
                popularity : movie.movie.popularity,
            }
        }
        setInputUser(newData)
    }, [loading])

    function handleSubmitForm(e) {
        e.preventDefault()
        console.log(inputUser)
    }

    function handleChange(e) {


        setInputUser({
            ...inputUser,
            [e.target.name] : e.target.value
        })
        console.log(inputUser)
    }
    if(loading) return <h1>loading...</h1>
    return(
        <form onSubmit = {handleSubmitForm}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                onChange = {(e) => {console.log(e.target.name, e.target.value)}} 
                type="text" 
                name= "title"
                value = {movie.movie.title}
                className="form-control" 
                aria-describedby="emailHelp" 
                />
            </div>

            <div className="mb-3">
                <label className="form-label">overview</label>
                <input
                // onChange = {handleChange} 
                value = {inputUser.name}

                type="text" 
                className="form-control" 
                name = "overview"
                aria-describedby="emailHelp" 
                />
            </div>

            <div className="mb-3">
                <label  className="form-label">Poster Path</label>
                <input
                // onChange = {handleChange} 
                value = {inputUser.name}

                type="text" 
                name = "poster_path"
                className="form-control" 
                aria-describedby="emailHelp" 
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Popularity</label>
                <input
                // onChange = {handleChange} 
                value = {inputUser.name}

                type="number"
                step = "0.1"
                className="form-control" 
                name = "popularity"
                aria-describedby="emailHelp" 
                placeholder = "0.2"
                />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
    </form>


    )
}