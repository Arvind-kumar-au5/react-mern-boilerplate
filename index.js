// Entry point
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const {User} = require('./modal/user')
const config = require('./config/key')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(err=>console.log(err))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.post('/api/v1/users/register',(req,res)=>{
    const user = new User(req.body)
    user.save((err,userData)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })
})


app.listen(5001)