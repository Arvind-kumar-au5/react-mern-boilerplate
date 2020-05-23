// Entry point
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const {User} = require('./modal/user')
const {auth } = require("./middleware/auth")
const config = require('./config/key')
const cookieParser = require('cookie-parser')

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(err=>console.log(err))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.json({"hello":"how are you"})
})

app.get('/api/v0/user/auth',auth,(req,res)=>{

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
       

    })
})

app.post('/api/v0/users/register',(req,res)=>{
    const user = new User(req.body)

    // before save with bycrpt password
    user.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true,
            userData:doc
        })
    })
})

app.post('/api/v0/users/login',(req,res)=>{
    // Find by email
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"Auth failed, email not found"
            })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("x_authExp", user.tokenExp);
                res
                    .cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true
                    });
            })
    })
})

    
})


// Logout
app.get('/api/v0/user/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc)=>{
        if (err) return res.status(500).json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })
})

const port  = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server Running At ${port}`)
})

app.listen(5001)