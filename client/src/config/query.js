import {gql} from "@apollo/client"


export const ADD_MOVIE = gql`
    mutation AddMovie($movie: newData) {
        addMovie(movie : $movie) {
            title
        }
    }
`
export const ADD_SERIES = gql`
    mutation AddMovie($series: newData) {
        addSeries(series : $series) {
            title
        }
    }
`

export const GET_MOVIE_BY_ID = gql`
    query GetMovieById($id: ID!) {
        movie(id: $id){
            _id
            title
            poster_path
            overview
            popularity
            tags
        }
    }
`

export const DELETE_MOVIE = gql`
    mutation DELETE_MOVIE($id: ID! ) {
        deleteMovie(id : $id) {
            title
        }
    }
`
export const DELETE_SERIES = gql`
    mutation DELETE_SERIES($id: ID! ) {
        deleteSeries(id : $id) {
            title
        }
    }
`

export const GET_FAVORITE = gql`
    query GetFavorite {
        favorites @client
    }
`

export const GET_MOVIES = gql`
    query GetMoviesData{
        movies {
            _id
            title
            poster_path
            overview
            tags
            popularity
        }
    }
`
export const GET_SERIES = gql`
    query GetSeriesData{
        series {
            _id
            title
            poster_path
            overview
            tags
            popularity
        }
    }
`

export const GET_SERIES_BY_ID = gql`
    query GetSeriesById($id: ID!) {
        serial(id: $id){
            _id
            title
            poster_path
            overview
            popularity
            tags
        }
    }
`
export const EDIT_MOVIE = gql`
    mutation EditMovie($id : ID!, $editedData : newData){
        editMovie(id : $id, editedData :$editedData){
            msg
        }
    }
`
export const EDIT_SERIES = gql`
    mutation EditSeeries($id : ID!, $editedData : newData){
        editSeries(id : $id, editedData :$editedData){
            msg
        }
    }
`