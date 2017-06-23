const express = require('express');
const router = express.Router();
const queries = require('./queries');

router.get('/count', queries.count)
router.post('/add', queries.add)
router.post('/check', queries.check)
router.post('/checkWins', queries.checkWins)

module.exports = router;
