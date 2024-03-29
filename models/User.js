const mongoose = require('mongoose')

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    }, 
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return emailRegex.test(v)
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    account_type: {
        type: Number,
        required: true
    }
}, {collection: 'users'})

userSchema.methods.comparePassword = function(enteredPassword) {
    const user = this
    return new Promise((resolve, reject) => {
        if (enteredPassword != user.password) {
            return reject("Passwords do not match")
        } else {
            resolve(true)
        }
    })  
}

mongoose.model('User', userSchema)