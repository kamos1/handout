const express = require('express');
const router = express.Router();
const queries = require('./queries');

router.get('/getWins', queries.getWins)
router.get('/getLosses', queries.getLosses)
router.post('/add', queries.add)
router.post('/check', queries.check)

module.exports = router;
