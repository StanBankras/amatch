const express = require('express');
const router = express.Router();

router.get('/chatting', (req, res) => {
    res.render('layout');
})

module.exports = router;