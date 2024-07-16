
const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`));
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');


const checkID = (req, res, next, val) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    if(!tour){
       
        return next(new AppError('No tour found with that ID', 404))
        
    }

    next()
}

const checkBody = (req, res, next) =>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail', 
            message: 'Missing name or price'
        })
    }
    next();
}




const getAllTours = catchAsync(async(req, res, next) =>{
    
    // console.log(tours)

    // ao inves de fazer try e catch


    res.status(200).json({
        status : 'sucess',
        requestedAt: req.requestTime,
        results : tours.length,
        tours : tours
    })
    
})

const getTour = catchAsync(async(req, res, next) =>{

    console.log(req.params)

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    

    res.status(200).json({
        status : 'sucess',
        data:{
            tour
        }
      
    })
})



const createTour = catchAsync(async(req, res, next) =>{

    console.log(req.body)
    const newId = tours[tours.length-1].id + 1; 
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);   

    fs.writeFile(`${__dirname}/data/tours-simple.json`, 
        JSON.stringify(tours), 
        err =>{
            res.status(201).json({
                status: 'sucess', data:{
                    tour: newTour
                }
            })
        }
    )   
})

const updateTour = catchAsync(async(req, res, next) =>{

    console.log(req.params)

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status : 'sucess',
        data:{
            tour
        }
      
    })
})

const deleteTour = catchAsync(async(req, res, next) =>{

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    res.status(204).json({
        status : 'sucess',
        data:{
            tour
        }
      
    })
})


module.exports = {
    checkID,
    checkBody,
    getAllTours, 
    getTour, 
    createTour, 
    updateTour, 
    deleteTour, 
}