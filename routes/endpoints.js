const express = require('express');
const router = express.Router();
const queries = require('./queries');

router.get('/api/v1/user/:username/getWins', queries.getWins)
router.get('/api/v1/user/:username/getLosses', queries.getLosses)
router.post('/add', queries.addOutcome)
router.post('/check', queries.checkOutcomes)

module.exports = router;
