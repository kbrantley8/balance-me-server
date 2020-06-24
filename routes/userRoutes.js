const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Task = mongoose.model('Task')

const router = express.Router()

router.get('/users', async (req, res) => {
    var users = await User.find()

    res.status(200).send(users)
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
    const {email} = req.query;

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
            user_id: user._id
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

                res.status(200).send({   
                    first_name: doc.first_name,
                    last_name: doc.last_name,
                    account_type: doc.account_type,
                    password: doc.password,
                    email: doc.email,
                    points: doc.points,
                    user_id: doc._id})
            } catch (err) {
                return res.status(422).send({error: err})
            }
        });

    } catch (e) {
        return res.send({error: e.message})
    }
})

router.get('/getAllAssignedTasks', async (req, res) => {
    const {email} = req.query;

    try {
        var user = await User.findOne({ 'email': email });

        if (!user) {
            return res.status(404).send({error: "Could not find the specified user. Please try again."})
        }

        var tasks = await Task.find({ 'assigned_user_id': user._id })

        res.status(200).send(tasks)

    } catch (e) {
        return res.send({error: e.message})
    }
})

router.get('/getAllCreatedTasks', async (req, res) => {
    const {email} = req.query;

    try {
        var user = await User.findOne({ 'email': email });

        if (!user) {
            return res.status(404).send({error: "Could not find the specified user. Please try again."})
        }

        var tasks = await Task.find({ 'created_user_id': user._id })

        res.status(200).send(tasks)

    } catch (e) {
        return res.send({error: e.message})
    }
})

router.delete('/deleteUser', async (req, res) => {

    const { email } = req.body;

    try {
        var user = await User.deleteOne({ 'email': email }, async function (err, doc) { 
            if (!doc.deletedCount) {
                return res.status(404).send({error: "Could not find the specified user. Please try again."})
            } else {
                return res.status(200).send(true)
            }

        })

    } catch (e) {
        res.send({error: e.message})
    }
})

router.post('/updatePoints', async (req, res) => {
    // const {userId} = req.body;
    const { email, points } = req.body;

    try {
        var user = await User.findOneAndUpdate({ 'email': email }, { "points": points }, async function(err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified user. Please try again."})
            }
        }).then(user => {
            return user;
        })

        res.status(200).send(user)

    } catch (e) {
        return res.send({error: e.message})
    }
})

router.post('/updateFirstName', async (req, res) => {
    // const {userId} = req.body;
    const { email, first_name } = req.body;

    try {
        var user = await User.findOneAndUpdate({ 'email': email }, { "first_name": first_name }, async function(err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified user. Please try again."})
            }
        }).then(user => {
            return user;
        })

        res.status(200).send(user)

    } catch (e) {
        return res.send({error: e.message})
    }
})

router.get('/getDailyTasks', async (req, res) => {
    const {email} = req.query;

    var start = new Date();
    start.setHours(0,0,0,0);
    start = (start.getTime() / 1000);

    var end = new Date();
    end.setHours(23,59,59,0);
    end = (end.getTime() / 1000);

    try {
        var user = await User.findOne({ 'email': email });

        if (!user) {
            return res.status(404).send({error: "Could not find the specified user. Please try again."})
        }

        var tasks = await Task.find({ 'assigned_user_id': user._id, 'start_time': { $gt: start, $lt: end } })

        res.status(200).send(tasks)

    } catch (e) {
        return res.send({error: e.message})
    }
})

module.exports = router;