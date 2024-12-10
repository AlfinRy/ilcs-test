const express = require('express');
const router = express.Router();
const { getLatestKurs } = require('../controllers/kursController');

router.get('/latest', getLatestKurs);

module.exports = router;
