const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient

var connectionString = 'mongodb+srv://dbUser:dbUserPassword@cluster0-ljyfs.mongodb.net/star-wars?retryWrites=true&w=majority';
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(3000, function() {
        console.log('listening on 3000')
    })

    // STRUCTURE: app.get(endpoint, callback)
    // endpoint: the stuff that comes after the domain name (e.g. google.com/this/is/the/endpoint)
    // callback: callback function to do when endpoint is met
    // callback function (request, response)
    // request: 
    // response: 
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then(result => {
            res.render('index.ejs', { quotes: result })
        })
        .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body).then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
        console.log(req.body)
      })
      
})