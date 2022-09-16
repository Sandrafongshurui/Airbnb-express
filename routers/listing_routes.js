const express = require('express')
const listingController = require('../controllers/listings/listing_controller')
const validation = require ("../middlewares/validation/validation")
const validators = require ("../middlewares/validation/validators/listingValidators")
const router = express.Router()

//http://localhost:8000/api/v1/
router.get('/', validation(validators.listListings), listingController.listListings)//returns []
router.get('/listings/:listing_id', listingController.showListing)//return {}


module.exports = router
