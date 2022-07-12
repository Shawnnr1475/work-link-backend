const mongoose = require("mongoose")
const clientSchema = mongoose.Schema

const clientTemp = new clientSchema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    cell:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    coordinates:{
        type:Array,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("client", clientTemp)