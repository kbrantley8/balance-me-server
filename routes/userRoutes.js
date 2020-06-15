const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const router = express.Router()

router.get('/users', async (req, res) => {
    var user = await User.find()

    res.status(200).send(user)
});

router.post('/createUser', async (req, res) => {
    const {first_name, last_name, email, password, points, account_type} = req.body;

    try {
        const user = new User({first_name, last_name, email, password, points, account_type});

        await user.save()

        res.send(user)
    } catch (e) {
        return res.status(422).send({error: e.message})
    }
})

module.exports = router;