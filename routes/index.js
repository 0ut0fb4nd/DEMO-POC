const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// User model
const Property = require('../models/Property')

// Welcome Page
router.get('/', (req,res) => res.render('welcome')) 

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req,res) => res.render('dashboard', {
    name: req.user.name
})) 

// Listings
router.get('/listings', ensureAuthenticated, (req,res) => res.render('listings')) 

//Listings-Details
router.get('/listings-details', ensureAuthenticated, (req,res) => res.render('listings-details')) 

//Contact Us
router.get('/contactus', ensureAuthenticated, (req,res) => res.render('contactus')) 

router.post('/contactus', ensureAuthenticated, (req,res) => {
    let property = new Property()
    property.contactName = req.body.contactName
    console.log(req.body.contactName)
})





// Export the routers
module.exports = router