const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const formidableMiddleware = require('express-formidable');
const app = express()



// Passport Config
require('./config/passport')(passport)

// DB Config
const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))


// EJS Middleware
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static('Public'))

//Body Parse
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

  // Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

  //Connect flash
  app.use(flash())

// GLobal Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
} )

//Routes
app.use('/', require('./routes/index'))
app.use('/contactus', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/admin', require('./admin'))

// Server Listener
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))