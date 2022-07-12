const express = require("express")
const Router = express.Router()
const Client = require("../models/clientmodel")


Router.get("/tester",(req,res)=>{
    res.send("Hello")
})

//Read All Clients
Router.get("/clients",async(req,res)=>{
    Client.find({},(err,data)=>{
        if(err){
            console.log("error when fetching")
        }
        else{
            res.send(data)
        }
    })
})

//Read a Client by id
Router.get("/client:id",async(req,res)=>{
    Client.findOne({_id:req.params.id},(err,data)=>{
        if(err){
            console.log("error when fetching")
        }
        else{
            res.send(data)
        }
    })
})

// Create new Client
Router.post("/signup/client", async (req,res)=>{

    //Check if the email exists
    const checkEmail = await Expert.findOne({email:req.body.email})
    if(checkEmail){
        res.send({'message':"Email already exists"}).status(400)
        return
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newclient = await new Client({
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
