import React, {useState} from "react"
import {gql ,useMutation} from "@apollo/client"
import { useHistory } from "react-router-dom"
import { ADD_MOVIE } from "../config/query"

// const ADD_MOVIE = gql`
//     mutation AddMovie($movie: newData) {
//         addMovie(movie : $movie) {
//             title
//         }
//     }
// `

export default function AddMovie() {
    const [inputUser, setInputUser] = useState({
        title : "",
        overview : "",
        poster_path : "",
        popularity : 0,
        // tags : ['coba 1', 'coba 2']
    })
    const [addMovie] = useMutation(ADD_MOVIE)
    const history = useHistory()
    
    function handleSubmitForm(e) {
        e.preventDefault()
        console.log(inputUser)
        addMovie({
            variables: {
                movie: inputUser
            }
        })
        history.push("/movie")
        
    }

    function handleChange(e) {


        setInputUser({
            ...inputUser,
            [e.target.name] : e.target.value
        })
        console.log(inputUser)
    }

    return (
    <form onSubmit = {handleSubmitForm}>


    <div className="mb-3">
        <label className="form-label">Title</label>
        <input
        onChange = {handleChange} 
        type="text" 
        name= "title"
        value = {inputUser.name}
        className="form-control" 
        aria-describedby="emailHelp" 
        />
    </div>

    <div className="mb-3">
        <label className="form-label">overview</label>
        <input
        onChange = {handleChange} 
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
        onChange = {handleChange} 
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
        onChange = {handleChange} 
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