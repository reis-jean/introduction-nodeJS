const fs = require('fs')

const express = require('express'); 
const morgan = require('morgan')

const app = express()

const port = 3000;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`))


app.use(morgan('dev'));
app.use(express.json())

app.use((req, res, next) => {
    console.log('hello from the middleware ✌🤞')
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); 
    next(); 
})




const getAllTours = (req, res) => {
    
    res.status(200).json({
        status : 'sucess',
        requestedAt: req.requestTime,
        results : tours.length,
        tours : tours
    })
    
}

const getTour = (req, res)=>{

    console.log(req.params)

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    if(!tour){
        res.status(400).json({
            status: 'fail',
            message: 'Invalid ID'
          
        })
    }

    res.status(200).json({
        status : 'sucess',
        data:{
            tour
        }
      
    })
}

const createTour = (req, res)=>{

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
}

const updateTour = (req, res)=>{

    console.log(req.params)

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    if(!tour){
        res.status(400).json({
            status: 'fail',
            message: 'Invalid ID'
          
        })
    }

    res.status(200).json({
        status : 'sucess',
        data:{
            tour
        }
      
    })
}

const deleteTour = (req, res)=>{

    console.log(req.params)

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    if(!tour){
        res.status(400).json({
            status: 'fail',
            message: 'Invalid ID'
          
        })
    }

    res.status(204).json({
        status : 'sucess',
        data:{
            tour
        }
      
    })
}


// Crud users

const getAllUsers = (req, res) => {
    
    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    })
    
}

const getUser = (req, res)=>{

    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    })
}

const createUser = (req, res)=>{

    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    }) 
}

const updateUser = (req, res)=>{

    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    })
}

const deleteUser = (req, res)=>{

    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    })
}


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


app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


app.route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser)

app.route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)


app.listen(port, ()=>{
    console.log(`App running on port ${port} ....`)
})


