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
    const { contactName, contactEmail, contactPhone} = req.body
    let errors = []

    // check required fields
    if(!contactName || !contactEmail || !contactPhone ){
        errors.push({ msg : 'Please fill in all fields' })
    }

    if(errors.length > 0){
        res.render('contactus', {
            errors,
            contactName,
            contactEmail,
            contactPhone
            
        })
        }  else {
            const newProperty = new Property({
                contactName,
                contactEmail,
                contactPhone
            })
            console.log(newProperty)
            res.send('hello')
    }
})





// Export the routers
module.exports = router