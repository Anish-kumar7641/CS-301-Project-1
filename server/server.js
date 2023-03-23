const express=require('express')
require('dotenv').config()
// const {connectToDb,getDb}=require('./config/dbConn')
const connectDb=require('./config/dbConn')
//const mongoose=require('mongoose')
const {logger}=require('./middleware/logger')
const {logEvents}=require('./middleware/logger')
const errorHandler=require('./middleware/errorHandler')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const corsOptions=require('./config/corsOptions')
const app=express()
const path=require('path')
const bodyParser = require('body-parser');

const User=require('./models/UserModel');
const Blog = require('./models/BlogModel');

app.use(logger)
// app.use(cors)
// app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))//to be able to read data from the url or form which we send
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));



connectDb()

//for running with react app:
app.use(express.static(path.join(__dirname,'build')))
app.use('/',require('./routes/root'))


app.use('/signin',require('./routes/SignIn'))
app.use('/signup',require('./routes/SignUp'))

app.use('/postBlog',require('./routes/CreateBlog'))

app.use('/home',require('./routes/Home'))

app.use('/explore',require('./routes/Explore'))

app.listen(5000,()=>{
            console.log(process.env.NODE_ENV)
            app.use(errorHandler)
            console.log("listening on port 5000")
})

