var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var con = require('./connection')
var model = require('./model')

// MongoDB Connection
mongoose.set('useFindAndModify', false)
var PhoneDirectory = mongoose.model('directory', model, 'phonedirectory')
mongoose.connect(con.connectionString, { useNewUrlParser: true })

// Use of Express required modules
var app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

// Get all the phone directory records
app.get('/getPhoneDetails', function (req, res) {
    PhoneDirectory.find(function (err, docs) {
        if (err) {
            console.log(err)
        }
        res.json(docs)
    })
})

// Get the existing phone directory record
app.get('/editPhoneDetails/:id', function (req, res) {
    var conditions = { '_id': mongoose.Types.ObjectId(req.params.id) }

    PhoneDirectory.findOne(conditions, function (err, docs) {
        if (err) {
            console.log(err)
        }
        res.json(docs)
    })
})

// Insert the new phone directory record
app.post('/addPhoneDetails', function (req, res) {
    var addPhoneDetails = new PhoneDirectory(req.body)

    addPhoneDetails.save(function (err, docs) {
        if (err) {
            console.log(err)
        }
        res.json(addPhoneDetails)
    })
})

// Delete the existing phone directory record
app.delete('/deletePhoneDetails/:id', function (req, res) {
    var conditions = { '_id': mongoose.Types.ObjectId(req.params.id) }

    PhoneDirectory.deleteOne(conditions, function (err, docs) {
        if (err) {
            console.log(err)
        }
        res.json(docs)
    })
})

// Update the existing phone directory record
app.put('/updatePhoneDetails/:id', function (req, res) {
    var conditions = { '_id': mongoose.Types.ObjectId(req.params.id) }
    var update = { '$set': req.body }
    var options = { new: true }

    PhoneDirectory.findOneAndUpdate(conditions, update, options, function (err, docs) {
        if (err) {
            console.log(err)
        }
        res.json(docs)
    })
})

// Port configuration 
var port = process.env.PORT || 5000
app.listen(port, function () {
    console.log('Server running on port number: ' + port)
})