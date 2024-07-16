const AppError = require("../utils/appError");

const handleCastErrorDB = err =>{
    const message = `Invalid ${err.path}: ${err.value}.`; 
    return new AppError(message, 400);

}


const handleDuplicateFieldsDB = err => {    
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
  
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  };

const handleValidationErrorDB = err =>{

    const error  = Object.values(err.erros).map(el => el.message); 

    const  message = `Invalid input data ${error.join('. ')}`; 

    return new AppError(message, 400)
}



const sendErrorDev = (err, res)=> {
    res.status(err.statusCode).json({
        status: err.status, 
        error: err, 
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res)=>{

    // operational, trusted error: send message to client
    if(err.IsOperational){

        res.status(err.statusCode).json({
            status: err.status, 
            message: err.message
        })

        // programing or other unknown error: don't leak error details
    }else{

        console.error('Error 🎇', err)
        res.status(500).json({
            status: 'error', 
            message: 'Something went very wrong!'
        })
    }
}


module.exports = (err, req, res, next) =>{

    // console.log(err.stack)
    err.statusCode = err.statusCode || 500; 
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
       sendErrorDev(err, res)
    }else if( process.env.NODE_ENV === 'production'){

        let error = {...err}; 
        // tratando um erro em especifico. 
        if(error.name === 'CastError') err = handleCastErrorDB(err) 
        if(error.code  === 11000 ) err = handleduplicateFieldsDB(err) 
        if(error.name === 'validationError') error = handleValidationErrorDB(err)


        sendErrorProd(error, res)
    }

    // res.status(err.statusCode).json({
    //     status: err.status, 
    //     message: err.message
    // })
}