const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://test_user:testpwd@ds157723.mlab.com:57723/test_util_db', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000....')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('InvoiceList').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {InvoiceList: result})
  })
})

app.post('/InvoiceList', (req, res) => {
  db.collection('InvoiceList').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Your invoice is saved to the database successfully!!')
    res.redirect('/')
  })
})
