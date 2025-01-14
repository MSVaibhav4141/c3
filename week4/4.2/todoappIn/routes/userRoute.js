const express = require('express')
const router = express.Router();


//Create todos 
router.post('/test', (req,res) => {
    res.send(req.body)
})

module.exports = router;