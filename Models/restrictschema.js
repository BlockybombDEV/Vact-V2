const {model, Schema} = require('mongoose')

let restrictSchema = new Schema({
    Guild: String,
    Channel: String,
});

module.exports = model('restrictions', restrictSchema)