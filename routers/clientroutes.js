const express = require("express")
const Router = express.Router()
const Client = require("../models/clientmodel")

// Create new Client

Router.get("/",(req,res)=>{
    res.send("Hello")
})
Router.post("/newclient", async (req,res)=>{
    const newclient = await new Client({
        name:req.body.name,
        surname:req.body.surname,
        cell:req.body.cell,
        address:req.body.address,
        coordinates:req.body.coordinates,
        email:req.body.email,
        password:req.body.password
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
