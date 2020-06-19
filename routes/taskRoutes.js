const express = require('express')
const mongoose = require('mongoose')
const Task = mongoose.model('Task')
const User = mongoose.model('User')

const router = express.Router()

router.get('/tasks', async (req, res) => {
    var tasks = await Task.find()

    res.status(200).send(tasks)
});

router.post('/createTask', async (req, res) => {
    const { data } = req.body;

    try {
        const task = new Task( data );

        await task.save()

        res.status(200).send({
            name: task.name,
            point_value: task.point_value, 
            category_id: task.category_id, 
            estimated_time: task.estimated_time, 
            description: task.description,
            start_time: task.start_time,
            estimated_completion_time: task.estimated_completion_time,
            status: task.status,
            image_path: task.image_path,
            assigned_user_id: task.assigned_user_id, 
            created_user_id: task.created_user_id,
            task_id: task._id,
            history: task.history,
            repeat: task.repeat
        })

    } catch (e) {
        return res.status(422).send({error: e.message})
    }
})

router.get('/getTask', async (req, res) => {

    const { task_id } = req.query;

    try {
        var task = await Task.findOne({ '_id': task_id });

        if (!task) {
            return res.status(404).send({error: "Could not find the specified task. Please try again."})
        }

        res.status(200).send({
            name: task.name,
            point_value: task.point_value, 
            category_id: task.category_id, 
            estimated_time: task.estimated_time, 
            description: task.description,
            start_time: task.start_time,
            estimated_completion_time: task.estimated_completion_time,
            status: task.status,
            image_path: task.image_path,
            assigned_user_id: task.assigned_user_id, 
            created_user_id: task.created_user_id,
            task_id: task._id,
            history: task.history,
            repeat: task.repeat
        })

    } catch (e) {
        return res.send({error: e.message})
    }
})

router.post('/updateTask', async (req, res) => {

    const { task_id, data } = req.body;

    try {
        var task = await Task.findOneAndUpdate({ '_id': task_id }, data, async function (err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified task. Please try again."})
            }
        })  

        res.status(200).send({
            name: task.name,
            point_value: task.point_value, 
            category_id: task.category_id, 
            estimated_time: task.estimated_time, 
            description: task.description,
            start_time: task.start_time,
            estimated_completion_time: task.estimated_completion_time,
            status: task.status,
            image_path: task.image_path,
            assigned_user_id: task.assigned_user_id, 
            created_user_id: task.created_user_id,
            task_id: task._id,
            history: task.history,
            repeat: task.repeat
        })
    } catch (e) {
        res.send({error: e.message})
    }
})

router.post('/assignTask', async (req, res) => {

    const { assigned_email, task_id } = req.body;

    try {
        var user = await User.findOne({ 'email': assigned_email }, async function (err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified user. Please try again."})
            }
        })

        var task = await Task.findOneAndUpdate({ '_id': task_id }, { assigned_user_id: user._id } , async function (err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified task. Please try again."})
            }
        })  

        res.status(200).send({
            name: task.name,
            point_value: task.point_value, 
            category_id: task.category_id, 
            estimated_time: task.estimated_time, 
            description: task.description,
            start_time: task.start_time,
            estimated_completion_time: task.estimated_completion_time,
            status: task.status,
            image_path: task.image_path,
            assigned_user_id: task.assigned_user_id, 
            created_user_id: task.created_user_id,
            task_id: task._id,
            history: task.history,
            repeat: task.repeat
        })
    } catch (e) {
        res.send({error: e.message})
    }
})

router.get('/getAssignedUser', async (req, res) => {

    const { task_id } = req.query;

    try {
        var task = await Task.findOne({ '_id': task_id }, async function (err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified task. Please try again."})
            }
        });

        var user = await User.findOne({ '_id': task.assigned_user_id }, async function (err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified user. Please try again."})
            }
        })

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

router.get('/getCreatedUser', async (req, res) => {

    const { task_id } = req.query;

    try {
        var task = await Task.findOne({ '_id': task_id }, async function (err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified task. Please try again."})
            }
        });

        var user = await User.findOne({ '_id': task.created_user_id }, async function (err, doc) {
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified user. Please try again."})
            }
        })

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

//of type
// { completion_time: 123, estimated_completion_time: 123, status: 0 }
router.post('/updateTaskHistory', async (req, res) => {

    const { task_id, history_log } = req.body;

    if (!history_log.estimated_completion_time || !history_log.completion_time || (history_log.status == undefined)) {
        res.status(400).send({error: "history_log is incorrect, check your format"})
    }

    try {
        var task = await Task.findOne({ '_id': task_id }, async function (err, doc) { 
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified task. Please try again."})
            }

            doc.history.push(history_log)
            await doc.save()

            res.status(200).send({
                name: doc.name,
                point_value: doc.point_value, 
                category_id: doc.category_id, 
                estimated_time: doc.estimated_time, 
                description: doc.description,
                start_time: doc.start_time,
                estimated_completion_time: doc.estimated_completion_time,
                status: doc.status,
                image_path: doc.image_path,
                assigned_user_id: doc.assigned_user_id, 
                created_user_id: doc.created_user_id,
                task_id: doc._id,
                history: doc.history,
                repeat: doc.repeat
            })

        })

    } catch (e) {
        res.send({error: e.message})
    }
})

// of type:
// { days: "none", weeks: "none"} or { days: "M, TR", weeks: "Single" }
router.post('/updateRepeat', async (req, res) => {

    const { task_id, repeat } = req.body;

    if (!repeat.days || !repeat.weeks) {
        return res.status(400).send({error: "The repeat statement is incorrect. Please try again."})
    }

    try {
        var task = await Task.findOne({ '_id': task_id }, async function (err, doc) { 
            if (!doc) {
                return res.status(404).send({error: "Could not find the specified task. Please try again."})
            }

            doc.repeat = repeat;
            await doc.save()

            res.status(200).send({
                name: doc.name,
                point_value: doc.point_value, 
                category_id: doc.category_id, 
                estimated_time: doc.estimated_time, 
                description: doc.description,
                start_time: doc.start_time,
                estimated_completion_time: doc.estimated_completion_time,
                status: doc.status,
                image_path: doc.image_path,
                assigned_user_id: doc.assigned_user_id, 
                created_user_id: doc.created_user_id,
                task_id: doc._id,
                history: doc.history,
                repeat: doc.repeat
            })

        })

    } catch (e) {
        res.send({error: e.message})
    }
})

router.delete('/deleteTask', async (req, res) => {

    const { task_id } = req.body;

    try {
        var task = await Task.deleteOne({ '_id': task_id }, async function (err, doc) { 
            if (!doc.deletedCount) {
                return res.status(404).send({error: "Could not find the specified task. Please try again."})
            } else {
                return res.status(200).send(true)
            }

        })

    } catch (e) {
        res.send({error: e.message})
    }
})

module.exports = router;