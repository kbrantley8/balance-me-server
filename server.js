// const express = require('express');
// const bodyParser= require('body-parser')
// const app = express();

// app.set('view engine', 'ejs')

// app.use(bodyParser.json())

// const MongoClient = require('mongodb').MongoClient


// const credentials = require('./credentials/mongo-credentials.json');
// var connectionString = 'mongodb+srv://'+ credentials.username + ':' + credentials.password + '@cluster0-in9zc.mongodb.net/balance-me?retryWrites=true&w=majority';
// MongoClient.connect(connectionString, {
//     useUnifiedTopology: true
//   }, (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')
//     const db = client.db('balance-me')
//     const usersCollection = db.collection('users')

//     app.use(bodyParser.urlencoded({ extended: true }))

//     app.listen(process.env.PORT || 3000, () => {
//         console.log(`Listening on port ${process.env.PORT}`)
//     })

//     app.use((req, res, next) => {
//         res.header('Access-Control-Allow-Origin', '*');
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//         next();
//     });

//     // STRUCTURE: app.get(endpoint, callback)
//     // endpoint: the stuff that comes after the domain name (e.g. google.com/this/is/the/endpoint)
//     // callback: callback function to do when endpoint is met
//     // callback function (request, response)
//     // request: 
//     // response: 
//     // app.get('/', (req, res) => {
//     //     db.collection('users').find().toArray()
//     //     .then(result => {
//     //         res.send(result)
//     //         // res.render('index.ejs', { quotes: result })
//     //     })
//     //     .catch(error => console.error(error))
//     // })

//     app.get('/users', (req, res) => {
//         db.collection('users').find().toArray()
//         .then(result => {
//             res.send(result)
//         })
//         .catch(error => console.log(error))
//     })

//     // app.post('/users', (req, res) => {
//     //     var temp = {
//     //         'first_name': "Kory",
//     //         'last_name': "Brantley"
//     //     }
//     //     usersCollection.insertOne(temp).then(result => {
//     //         // res.redirect('/')
//     //         res.send(result)
//     //     })
//     //     .catch(error => console.error(error))
//     // })

//     // app.put('/users', (req, res) => {
//     //     usersCollection.findOneAndUpdate(
//     //         { first_name: 'Kory' },
//     //         {
//     //           $set: {
//     //             first_name: 'Lauren',
//     //             last_name: 'Jeffery'
//     //           }
//     //         },
//     //         {
//     //           upsert: true
//     //         }
//     //       )
//     //         .then(result => {
//     //             res.send(result)
//     //         })
//     //         .catch(error => console.error(error))
//     // })
      
// })

require('./models/User')

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json())
app.use(userRoutes)

const credentials = require('./credentials/mongo-credentials.json');
var connectionString = 'mongodb+srv://'+ credentials.username + ':' + credentials.password + '@cluster0-in9zc.mongodb.net/balance-me?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})