import {gql} from "@apollo/client"


export const ADD_MOVIE = gql`
    mutation AddMovie($movie: newData) {
        addMovie(movie : $movie) {
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