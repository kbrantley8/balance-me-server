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

        res.status(200).send(user)

    } catch (e) {
        return res.status(422).send({error: e.message})
    }
})

router.get('/getUser', async (req, res) => {
    // const {userId} = req.body;
    const {email} = req.body;

    try {
        // const user = new User.findOne({ '_id': userId })
        var user = await User.findOne({ 'email': email });

        if (!user) {
            return res.status(404).send({error: "Could not find the specified user. Please try again."})
        }

        res.status(200).send({
            first_name: user.first_name,
            last_name: user.last_name,
            account_type: user.account_type,
            password: user.password,
            email: user.email,
            points: user.points,
            userId: user._id
        })

    } catch (e) {
        return res.send({error: e.message})
    }
})

router.post('/updateEmail', async (req, res) => {
    // const {userId} = req.body;
    const { old_email, new_email, password } = req.body;

    try {
        // const user = new User.findOne({ '_id': userId })
        var user = await User.findOne({ 'email': old_email }, async function(err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified user. Please try again."})
            }

            try {
                await doc.comparePassword(password)
            } catch (err) {
                return res.status(400).send({error: err})
            }

            try {
                doc._doc = {...doc._doc, email: new_email}
                doc.markModified('email')
                await doc.save()

                res.send(doc)
            } catch (err) {
                return res.status(422).send({error: err})
            }
        });

    } catch (e) {
        return res.send({error: e.message})
    }
})

module.exports = router;