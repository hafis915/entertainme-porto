const router = require('express').Router()
const EntertainMeController = require('../controller/entertaintController')


router.get('/entertainme',EntertainMeController.getAllData)
router.get('/entertainme/movies/:id',EntertainMeController.getMovieById)
router.get('/entertainme/series/:id',EntertainMeController.getSeriesById)

router.post('/entertainme/movies', EntertainMeController.createMovie)
router.post('/entertainme/series', EntertainMeController.createSeries)

router.put('/entertainme/movies/:movieId', EntertainMeController.updateMovieById)
router.put('/entertainme/series/:seriesId', EntertainMeController.updateSeriesById)

router.delete('/entertainme/movies/:movieId', EntertainMeController.deleteMovieById)
router.delete('/entertainme/series/:seriesId', EntertainMeController.deleteSeriesById)



module.exports = router