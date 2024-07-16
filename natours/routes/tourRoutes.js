const express = require('express')

const tourController = require ('../controllers/tourController')

// get all
// app.get('/api/v1/tours', getAllTours)
// get by id
// app.get('/api/v1/tours/:id', getTour)
// create
// app.post('/api/v1/tours', createTour)
// update
// app.patch('/api/v1/tours/:id', updateTour)
// // Delete
// app.delete('/api/v1/tours/:id', deleteTour)


const router = express.Router();

router.param('id', tourController.checkID)

router.route('/')
    .get(tourController.getAllTours)
    .post( tourController.checkBody,  tourController.createTour)

router.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)


module.exports = router