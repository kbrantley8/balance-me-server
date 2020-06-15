const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const router = express.Router()

router.get('/users', async (req, res) => {
    var user = await User.find()

    res.status(200).send(user)
});

module.exports = router;