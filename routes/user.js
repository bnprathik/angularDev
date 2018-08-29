const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const userRouter = express.Router();
const Profile = require('../models/profile');
userRouter.use(bodyParser.json());
userRouter.route('/register')
.post((req,res,next) => {
    let newUser = new User({
    username: req.body.userName,
    password: req.body.password
    });
    User.addUser(newUser, (err,user) =>{
        if(err) {
            res.json({success: false,
                        msg:'failed to register'});
            } else {
                res.json({success: true, msg: 'registred'});
                
            }
    })
});
userRouter.route('/authenticate')
.post((req,res,next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    User.getUserByUserName(userName , (err,user) => {
        if(err) throw  err;
        if(!user) {
            return res.json ({success:false , msg:'user not found'});
        }
        User.comparePassword(password, user.password , (err,isMatch) => { 
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(),dbConfig.secret , {
                    expiresIn: 604800
                });
                res.json({
                    success:true,
                    token : 'JWT ' + token,
                    user:{
                        id:user._id,
                        userName:user.username
                    }
                });
            }
            else {
                console.log(user.password);
                return res.json ({success:false , msg:'wrong password'});
            }

        });
    });
});
userRouter.route('/social-login')
.post((req,res,next) => {
    console.log(req.body);
    console.log('@@@@@@@@@@@@@@222')
    let newUser = new User({
        userid: req.body.userId,
        username: req.body.userName,
        role:req.body.role,
        useremailid:req.body.email,
        });
        console.log(newUser);
    User.addUserBySocialLogin(newUser, (err,user) =>{
        console.log(user);
        if(err){
        if( err === 'err1')
        res.json({ success: true,
            user:user,
            msg:'err user exists '});
        else res.json({success: false,
                    msg:'failed to register'});
        } else {
            res.json({success: true, msg: 'registred'});
            }
    });
});
userRouter.route('/profile')
.get((req,res,next)=>{
    console.log('in profile')
    console.log(req.query);
User.findOne({userid:req.query.userId}).then(res=>{
    console.log(res);
});
});
// bookRouter.get('/',(req,res,next) => {
//     Books.find({})
//     .then((dishes) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(dishes);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });
module.exports =userRouter;
