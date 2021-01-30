const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport')
const cors = require('cors')

const app = express();

//DotEnv
require('dotenv').config({ path: '.env' });



//Mongoose 
//Connection
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true , useUnifiedTopology: true}) //Promise
    .then(() => console.log('Mongoose: You are connected!'))
    .catch(err => console.log(err))


//BodyParser //parse data from form
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//Express Session
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Pass config
require('./config/passport')(passport);
app.use(cors());

// Express validator
app.use(expressValidator());

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Listening on port ' + PORT))