require('dotenv').config()

var envName = process.env.NODE_ENV || 'dev'
var conUrl = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.PASSWORD + '@' + process.env.DB_URL + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority'

if (envName == "dev") {
    conUrl = 'mongodb://localhost:27017/' + process.env.DB_NAME
}

exports.connectionString = conUrl