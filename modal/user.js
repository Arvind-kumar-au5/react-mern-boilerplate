const mongoose = require('mongoose')

const  userShema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1

    },
    password:{
        type:String,
        minglength:5
    },
    lastname:{
        type:String,
        maxlength:20
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String,
    },
    tokenExp:{
        type:Number
    }
})

const User = mongoose.model('User',userShema)


module.exports = { User }