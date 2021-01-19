const {gql} = require('apollo-server')

const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: String
        tags: [String]
        
    }
    type Series {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: String
        tags: [String]
    }

    type Msg {
        msg: String
    }

    type Query {
        movies: [Movie]
        movie(id : ID!) : Movie
        serial(id : ID!) : Series
        series: [Series]
    }

    type Mutation {
        
        addMovie(movie : newData) : Movie
        addSeries(series: newData) : Series



        editMovie(id: ID!, editedData:newData): Msg
        editSeries(id: ID!, editedData:newData): Msg
        
        deleteMovie(id: ID!): Movie
        deleteSeries(id: ID!): Series
    }
    input newData {
        title: String
        overview: String
        poster_path: String
        popularity: String
        tags: [String]
    }
`

module.exports = typeDefs