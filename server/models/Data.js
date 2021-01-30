const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({ //schema
    btcPrice: {
        type:String,
        required:true
    },
    ethPrice: {
        type:String,
        required:true
    },
    exchange: {
        type:String,
        required:true
    },
    url: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default: Date.now
    }
});

//export

const Data = mongoose.model('Data', DataSchema,'data'); //model name and schema name

module.exports= Data;
