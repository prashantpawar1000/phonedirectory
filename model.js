var mongoose = require('mongoose')

// Schema for phone directory collection
module.exports = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: String,
    homeNumber: String,
    workNumber: String
})