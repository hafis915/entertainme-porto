const db = require('../config')
const Movies = db.collection('Movies')
const { ObjectId } = require('mongodb')

class MoviesModel {

    //find data
    static find(query,option) {
        return Movies.find(query,option).toArray()
    }
    static findOne(query,projection){
        return Movies.findOne(query,projection)
    }
    // create data
    static insertOne(data) {
        return Movies.insertOne(data)
    }
    static insertMany(data) {
        return Movies.insertMany(data)
    }

    //update Data
    static updateOne(id, data) {
        const filter = {_id: ObjectId(id) }
        const updateData = {
            $set: data
        }
        return Movies.updateOne(filter,updateData)
    }

    //delete data

    static deleteOne(id){
        const filter = {_id: ObjectId(id)}
        return Movies.deleteOne(filter)
    }

}


module.exports = MoviesModel