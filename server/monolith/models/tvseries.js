const db = require('../config')
const TvSeries = db.collection('TvSeries')
const { ObjectId } = require('mongodb')

class TvSeriesModel {

    //find data
    static find(query,option) {
        return TvSeries.find(query,option).toArray()
    }
    static findOne(query,projection){
        return TvSeries.findOne(query,projection)
    }
    // create data
    static insertOne(data) {
        return TvSeries.insertOne(data)
    }
    static insertMany(data) {
        return TvSeries.insertMany(data)
    }

    //update Data
    static updateOne(id, data) {
        const filter = {_id: ObjectId(id) }
        const updateData = {
            $set: data
        }
        return TvSeries.updateOne(filter,updateData)
    }

    //delete data

    static deleteOne(id){
        const filter = {_id: ObjectId(id)}
        return TvSeries.deleteOne(filter)
    }

}


module.exports = TvSeriesModel