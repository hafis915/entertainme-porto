const router = require('express').Router()
const MovieController = require('../controller/movieController')

router.get('/', MovieController.find)
router.get('/:id', MovieController.findById)
router.post('/', MovieController.insertOne)
router.put('/:id', MovieController.updateOne)
router.delete('/:id', MovieController.deleteOne)

module.exports = router