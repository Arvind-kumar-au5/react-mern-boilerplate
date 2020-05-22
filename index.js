// Entry point
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mentor:Pm1IfYvuNBkmLR8X@cluster0-4o6cx.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(err=>console.log(err))
app.get('/',(req,res)=>{
    res.send('hello world')
})


app.listen(5000)