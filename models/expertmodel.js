const mongoose = require("mongoose")
const expertSchema = mongoose.Schema

const expertTemp = new expertSchema({
    profilepic:{
        type:String,
    },
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

module.exports = mongoose.model("expert", expertTemp)