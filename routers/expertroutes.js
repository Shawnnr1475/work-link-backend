const express = require("express")
const Router = express.Router()
const Expert = require("../models/expertmodel")
const bcrypt = require("bcrypt")
const multer  = require('multer')
const path = require("path")

const storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , Date.now() + "--" + file.originalname);   
    }
 });

const upload = multer({ 
    storage:storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
})


//Read All Clients
Router.get("/experts",async(req,res)=>{
    Expert.find({},(err,data)=>{
        if(err){
            console.log("error when fetching")
        }
        else{
            res.send(data)
        }
    })
})

// Create new Expert
Router.post("/signup/expert", upload.single("profilepic"), async (req,res)=>{

    //Check if the email exists
    const checkEmail = await Expert.findOne({email:req.body.email})
    if(checkEmail){
        res.send({'message':"Email already exists"}).status(400)
        return
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Path of profilepic
    const imgPath = path.join("uploads",file.filename)

    const newExpert = await new Expert({
        profilepic: imgPath,
        name:req.body.name,
        surname:req.body.surname,
        cell:req.body.cell,
        address:req.body.address,
        coordinates:req.body.coordinates,
        email:req.body.email,
        password:hashedPassword
    })
    .save()
    .then(results=>{
        res.status(200)
        res.send(results)
    })
    .catch(err=>{
        res.status(503)
        res.send(err)
    })
})

module.exports = Router
