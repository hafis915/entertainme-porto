const router = require('express').Router()
const TvSeriesController = require('../controller/tvseriesController')

router.get('/', TvSeriesController.find)
router.get('/:id', TvSeriesController.findById)
router.post('/', TvSeriesController.insertOne)
router.put('/:id', TvSeriesController.updateOne)
router.delete('/:id', TvSeriesController.deleteOne)


module.exports =router