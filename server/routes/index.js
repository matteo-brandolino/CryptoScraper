const express = require('express');
const scraperController= require('../controllers/scraperController');
const router = express.Router();

// Dashboard

router.post('/scraper', scraperController.scraper)
router.get('/history', scraperController.history)

module.exports = router