const Movies = require('../models/movie')
const { ObjectId } = require('mongodb')


class MovieController {
    //Read Data
    static find(req,res) {
        Movies.find()
            .then(result => {
                console.log(result)
                res.status(200).json({movies :result})
            })
    }
    static findById(req,res) {
        const title  = req.params.id
        const filter = {
            _id: ObjectId(title)
        }
        console.log(filter)
        Movies.findOne(filter)
            .then(result => {
                console.log(result)
                res.status(200).json({movie : result})
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
        const movies = await Movies.insertOne(newData)
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

        const updateData = await Movies.updateOne(id,newData)
        console.log(updateData)
        res.status(200).json({msg : 'succes update data'})
    }

    //delete By Id
    static async deleteOne(req,res) {
        const id = req.params.id
        try {
            const deletedData = await Movies.deleteOne(id)
            console.log(deletedData)
            res.status(200).json({msg: 'success delete data'})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = MovieController