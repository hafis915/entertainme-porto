const router = require('express').Router()
const movieRouter = require('./movieRouter')
const tvSeriesRouter = require('./tvSeriesRouter')


router.use('/movie',movieRouter)
router.use('/tvseries',tvSeriesRouter)

module.exports =router