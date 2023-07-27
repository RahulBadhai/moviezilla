// init other pacakage
const express = require('express');
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const cors = require('cors');
const cookieParser = require('cookie-parser');

// inti app 
const  app = express();

// access .env variable
require('dotenv').config();

// import routes
const authroutes = require('./route/user');

// connection db
const dbUri = `mongodb+srv://rahulbadhai99:${process.env.DB_PASSWORD}@cluster0.pbvi6dm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// mongoose.connect(process.env.DATABASE,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(()=>console.log('Rahul Badhai DB connect'));
mongoose.connect(dbUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('Rahul Badhai DB connect'));

// middleware
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use(cookieParser());

// routes middleware
app.use('/api',authroutes);



// app listen
const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log("Movie.IO run at port:"+port);
})