const express = require('express');
const dotenv= require("dotenv");
const bodyParser = require('body-parser');
const cookiePaser = require('cookie-parser');
const db = require('./config/db')
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookiePaser());
app.use(bodyParser.urlencoded({ extended: true }));

// user route
const userRoute = require('./routes/userRoute');
app.use('/api/user',userRoute);

// category route
const categoryRoute = require('./routes/categoryRoute');
app.use('/api/category',categoryRoute);

// article route

const articleRoute = require('./routes/articleRoute');
app.use('/api/article',articleRoute);


app.use('*',(req,res)=>{
    res.status(400).json({
        message:"OOPS! Page not found!",

    })
});

module.exports = app;
