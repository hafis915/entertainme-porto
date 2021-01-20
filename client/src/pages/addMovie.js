import React, {useState} from "react"
import {gql ,useMutation} from "@apollo/client"
import { useHistory,useParams } from "react-router-dom"
import { ADD_MOVIE , ADD_SERIES} from "../config/query"
import { TagInput } from "reactjs-tag-input"

export default function AddMovie() {
    const {kind} = useParams()
    const [inputUser, setInputUser] = useState({
        title : "",
        overview : "",
        poster_path : "",
        popularity : 0,
        tags : []
    })
    console.log(kind)
    const [addMovie] = useMutation(ADD_MOVIE)
    const [addSeries] = useMutation(ADD_SERIES)
    const history = useHistory()
    
    function handleSubmitForm(e) {
        e.preventDefault()
        inputUser.tags = inputUser.tags.split(",")
        console.log(inputUser)
        if(kind === "movie") {
            addMovie({
                variables: {
                    movie: inputUser
                }
            })
            history.push("/movie")
        }else {
            addSeries({
                variables: {
                    series: inputUser
                }
            })
            history.push("/series")
        }

        
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

    <div className="mb-3">
        <label className="form-label">Tags</label>
        <input
        onChange = {handleChange} 
        value = {inputUser.name}
        type="text"
        className="form-control" 
        name = "tags"
        placeholder="add minimu 2 tags seperated by coma. exp: tags1,tags2"
        />
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )
}