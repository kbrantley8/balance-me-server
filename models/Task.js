const mongoose = require('mongoose')

const history_schema = {
    completion_time: "",
    estimated_completion_time: "",
    status: "",
    completed: "",
    points_awarded: "",
    start_time: ""
}

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    point_value: {
        type: Number,
        required: true,
    },
    category_id: {
        type: Number,
        required: true
    },
    estimated_time: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_time: {
        type: Number,
        required: false,
        default: null
    },
    estimated_completion_time: {
        type: Number,
        required: false,
        default: null
    },
    status: {
        type: Number,
        required: true,
        default: 3
    },
    completion_time: {
        type: Number,
        required: false,
        default: null
    },
    image_path: {
        type: String,
        required: true,
        default: "empty"
    },
    assigned_user_id: {
        type: String,
        required: true
    },
    created_user_id: {
        type: String,
        required: true
    },
    history: {
        type: Array,
        of: history_schema,
        requred: true,
        default: []
    },
    repeat: {
        type: Map,
        of: Array,
        required: true,
        default: {
            days: [],
            frequency: []
        }
    },
    completed: {
        type: Boolean,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        required: true,
        default: 0
    },
    steps: {
        type: Array,
        required: false,
        default: []
    }
}, {collection: 'tasks'})

mongoose.model('Task', taskSchema)