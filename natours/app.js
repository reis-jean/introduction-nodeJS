
const express = require('express'); 
const morgan = require('morgan')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json()); 
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log('hello from the middleware ✌🤞')
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); 
    next(); 
})


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


// este é um midleware que deve ser executados após todas as outras rotas. 
app.all('*', (req, res, next) => {

    // res.status(404).json({
    //     status: 'fail', 
    //     message: `can't find ${req.originalUrl} on this server`

    // })

    // const err = new Error(`can't find ${req.originalUrl} on this server`);
    // err.status = 'fail'; 
    // err.statusCode = 404;
    // next(err); 
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))


});

app.use(globalErrorHandler)





module.exports= app;


