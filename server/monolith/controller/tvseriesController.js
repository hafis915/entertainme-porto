const TvSeries = require('../models/tvseries')
const { ObjectId } = require('mongodb')


class TvSeriesController {
    //Read Data
    static find(req,res) {
        TvSeries.find()
            .then(result => {
                console.log(result)
                res.status(200).json({result})
            })
    }
    static findById(req,res) {
        const title  = req.params.id
        const filter = {
            _id: ObjectId(title)
        }
        console.log(filter)
        TvSeries.findOne(filter)
            .then(result => {
                console.log(result)
                res.status(200).json({result})
            })
        
    }

    // Create Data
    static async insertOne(req,res) {
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
        const movies = await TvSeries.insertOne(newData)
        console.log(movies.ops)
        res.status(200).json({movies: movies.ops})
    }

    //UpdateData
    static async updateOne(req,res) {
        const id = req.params.id
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

        const updateData = await TvSeries.updateOne(id,newData)
        console.log(updateData)
        res.status(200).json({msg : 'succes update data'})
    }

    //delete By Id
    static async deleteOne(req,res) {
        const id = req.params.id
        try {
            const deletedData = await TvSeries.deleteOne(id)
            console.log(deletedData)
            res.status(200).json({msg: 'success delete data'})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = TvSeriesController