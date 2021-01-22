const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const typeDefs = require('./typeDefs')
const Redis = require("ioredis")
const redis = new Redis()

const resolvers = {
    Query : {
        movies : async function getMovies() {
            const cache = await redis.get("movie")
            if(cache){
                // console.log(cache)
                return JSON.parse(cache)
            }else {
                return axios({
                    method: 'GET',
                    url : 'http://localhost:4001/'
    
                }).then (({ data }) => {
                    console.log(data)
                    redis.set("movie", JSON.stringify(data.movies))
                    return data.movies
                }).catch(e =>  console.log(e))
            }

        },
        series : async function getSeries() {
            const cache = await redis.get("series")
            if (cache) {
                return JSON.parse(cache)
            }else {
                return axios({
                    method: 'GET',
                    url: 'http://localhost:4002/'
                }).then(({ data }) => {
                    console.log(data, '<<<<<<<<< ini series')
                    redis.set("series", JSON.stringify(data.series))
                    return data.series
                }).catch( e => console.log(e))
            }
        },
        movie : async function getMovieById(_,args) {
            console.log(args, "ini args")
            const id = args.id
            const cache = await redis.get(`movie_${id}`)
            if(cache) {
                return JSON.parse(cache)
            }else {
                return axios({
                    method : "get",
                    url : `http://localhost:4001/${id}`
                }).then(( { data }) => {
                    console.log(data)
                    redis.set(`movie_${id}`, JSON.stringify(data.movie))
                    return data.movie
                }).catch( e => {return e})
            }
            
        },
        serial : async function getSeriesById(_,args) {
            console.log(args, "ini args")
            const id = args.id
            const cache = await redis.get(`series_${id}`)
            if(cache){
                return JSON.parse(cache)
            }else {
                return axios({
                    method : "get",
                    url : `http://localhost:4002/${id}`
                }).then(( { data }) => {
                    console.log(data, "ini series")
                    redis.set(`series_${id}`, data.result)
                    return data.result
                }).catch( e => {return e})
            }

        },
    },
    Mutation : {
        addMovie : function addMovie(_, args) {
            console.log(args, '<<<<< ini args')
            const newData = {
                title : args.movie.title,
                overview : args.movie.overview,
                poster_path : args.movie.poster_path,
                popularity : args.movie.popularity,
                tags : args.movie.tags
            }
            console.log(newData)
            return axios({
                method : 'POST',
                url: 'http://localhost:4001/',
                data: newData
            }).then(({ data }) => {
                redis.del("movie")
                console.log(data, "hapus dulu")
                return data.movies[0] 
            })
        },

        addSeries : function addSeries(_, args) {
            console.log(args, '<<<<< ini args')
            const newData = {
                title : args.series.title,
                overview : args.series.overview,
                poster_path : args.series.poster_path,
                popularity : args.series.popularity,
                tags : args.series.tags
            }
            console.log(newData)
            return axios({
                method : 'POST',
                url: 'http://localhost:4002/',
                data: newData
            }).then(({ data }) => {
                redis.del("series")
                console.log(data)
                return data.series[0] 
            })
        }, 

        editMovie: function editMovie(_, args) {
            const id = args.id
            console.log("MASUK EDITs")
            const newData = {
                title : args.editedData.title,
                overview : args.editedData.overview,
                poster_path : args.editedData.poster_path,
                popularity : args.editedData.popularity,
                tags : args.editedData.tags
            }
            axios({
                method: 'PUT',
                url: `http://localhost:4001/${id}`,
                data: newData
            })
            .then(({data}) => {
                console.log(data, "ini data")
                redis.del(`movie_${id}`)
                redis.del("movie")
                return data
            })
            .catch(e => console.log(e))
        },

        editSeries: function editSeries(_, args) {
            const id = args.id
            const newData = {
                title : args.editedData.title,
                overview : args.editedData.overview,
                poster_path : args.editedData.poster_path,
                popularity : args.editedData.popularity,
                tags : args.editedData.tags
            }
            axios({
                method: 'PUT',
                url: `http://localhost:4002/${id}`,
                data: newData
            })
            .then(({data}) => {
                console.log(data, "ini data")
                redis.del(`series_${id}`)
                redis.del("series")
                return data
            })
            .catch(e => console.log(e))
        },

        deleteMovie: function deleteMovie(_, args) {
            id = args.id
            axios({
                method: 'delete',
                url: `http://localhost:4001/${id}`
            })
            .then(({data}) => {
                console.log(data)
                redis.del("movie")
                redis.del(`movie_${id}`)
                return data
                // redis.del(`${id}`)
                // res.status(200).json(result.data)
            })
            .catch(e => console.log(e))  
        },

        deleteSeries: function deleteSeries(_, args) {
            id = args.id
            axios({
                method: 'delete',
                url: `http://localhost:4002/${id}`
            })
            .then(({data}) => {
                redis.del("series")
                redis.del(`series_${id}`)
                console.log(data)
                return data
                // redis.del(`${id}`)
                // res.status(200).json(result.data)
            })
            .catch(e => console.log(e))  
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})