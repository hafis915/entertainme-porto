const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class EntertainMeController {

    static async getAllData(req,res) {
        console.log('==========================')
        try {
            const cache = await redis.get("entertain")
            if(cache) {
                res.status(200).json(JSON.parse(cache))
            }else {
                const getMovies = axios.get('http://localhost:4001/')
                const getSeries = axios.get('http://localhost:4002/')
                Promise.all([getMovies,getSeries])
                    .then((value) => {
                        // console.log(value[1].data.result)
                        const data = value.map((el,idx) => {
                            return el.data
                        })
                        redis.set('entertain',JSON.stringify(data))
                        res.status(200).json(data)
                    })
                    .catch(err => console.log(err))
            }
        } 
        catch (error) {
         console.log(error)   
        }
    }

    static getMovieById(req,res) {
        const movieId = req.params.id
        axios({
            method: 'GET',
            url: `http://localhost:4001/${movieId}`
        })
            .then(result => {
                console.log(result.data, '============= Ini result')
                const data = result.data
                res.status(200).json(data)
            })
            .catch(e => console.log(e))
    }

    static getSeriesById(req,res) {
        const seriesId = req.params.id
        axios({
            method: 'GET',
            url: `http://localhost:4002/${seriesId}`
        })
            .then(result => {
                console.log(result.data, '============= Ini result')
                const data = result.data
                res.status(200).json(data)
            })
            .catch(e => console.log(e))
    }

    static createMovie(req,res) {
        const { title,
            overview,
            poster_path,
            popularity,
            tags } = req.body

        const newData = {
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
        axios({
            method: 'post',
            url: 'http://localhost:4001/',
            data: newData
        })
            .then(result => {
                console.log(result.data)
                res.status(200).json(result.data)
            })
    }

    static createSeries(req,res) {
        const { title,
            overview,
            poster_path,
            popularity,
            tags } = req.body

        const newData = {
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
        axios({
            method: 'post',
            url: 'http://localhost:4002/',
            data: newData
        })
            .then(result => {
                console.log(result.data)
                res.status(200).json(result.data)
            })
            .catch(e => console.log(e))
    }

    static updateMovieById(req,res) {
        const id = req.params.movieId
        const { title,
            overview,
            poster_path,
            popularity,
            tags } = req.body
        const newData = {
                title,
                overview,
                poster_path,
                popularity,
                tags
        }

        axios({
            method: 'PUT',
            url: `http://localhost:4001/${id}`,
            data: newData
        })
        .then(result => {
            console.log(result.data)
            res.status(200).json(result.data)
        })
        .catch(e => console.log(e))
    }

    static updateSeriesById(req,res) {
        const id = req.params.seriesId
        const { title,
            overview,
            poster_path,
            popularity,
            tags } = req.body
        const newData = {
                title,
                overview,
                poster_path,
                popularity,
                tags
        }

        axios({
            method: 'PUT',
            url: `http://localhost:4002/${id}`,
            data: newData
        })
        .then(result => {
            console.log(result.data)
            res.status(200).json(result.data)
        })
        .catch(e => console.log(e))
    }

    static deleteMovieById(req,res) {
        const id = req.params.movieId
        axios({
            method: 'delete',
            url: `http://localhost:4001/${id}`
        })
        .then(result => {
            console.log(result.data)
            res.status(200).json(result.data)
        })
        .catch(e => console.log(e))   
    }

    static deleteSeriesById(req,res) {
        const id = req.params.seriesId
        axios({
            method: 'delete',
            url: `http://localhost:4002/${id}`
        })
        .then(result => {
            console.log(result.data)
            res.status(200).json(result.data)
        })
        .catch(e => console.log(e))   
    }
}

module.exports = EntertainMeController