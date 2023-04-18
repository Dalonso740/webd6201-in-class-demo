/*  Names: Diego Cruz and Neema Mwansembo 
    Date: 17th April 2023 */

import { User } from '../databasemongo'

import express from 'express'
const router = express.Router()

// GET users
router.get('/', (req, res, next) => {
    res.send({ msg: "users" })
})

router.post('/', (req, res, next) => {
    const newUser = new User({...req.body});
    newUser.save()
    .then((user:any)=>{
        if(user){
            console.log("All good")
            res.send({ msg: "ok" })
        }
        else{
            console.log("something went wrong")
            res.send({ msg: "error" })
        }
    })
    .catch((e:any)=>{
        console.log("There was an error", e)
        res.send({ msg: "error" })
    })
})

router.post('/login', (req, res, next) => {
    User.findOne({username:req.body.username, password:req.body.password})
    .then((user:any)=>{
        if(user){
            console.log("All good")
            res.send({...user})
        }
        else{
            console.log("something went wrong")
            res.send({ msg: "error" })
        }
    })
    .catch((e:any)=>{
        console.log("There was an error", e)
        res.send({ msg: "error" })
    })
})

router.get('/reading', (req, res, next) => {
    User.find()
    .then((user:any)=>{
        if(user){
            console.log("All good")
            res.send({...user})
        }
        else{
            console.log("something went wrong")
            res.send({ msg: "error" })
        }
    })
    .catch((e:any)=>{
        console.log("There was an error", e)
        res.send({ msg: "error" })
    })
})

router.post('/update', (req, res, next) => {
    User.findOneAndUpdate({username:req.body.username}, {...req.body}, {new:true})
    .then((user:any)=>{
        if(user){
            console.log("All good")
            res.send({...user})
        }
        else{
            console.log("something went wrong")
            res.send({ msg: "error" })
        }
    })
    .catch((e:any)=>{
        console.log("There was an error", e)
        res.send({ msg: "error" })
    })
})

router.post('/edit', (req, res, next) => {
    User.findOne({username:req.body.username})
    .then((user:any)=>{
        if(user){
            console.log("All good")
            res.send({...user})
        }
        else{
            console.log("something went wrong")
            res.send({ msg: "error" })
        }
    })
    .catch((e:any)=>{
        console.log("There was an error", e)
        res.send({ msg: "error" })
    })
})

router.post('/delete', (req, res, next) => {
    User.findOneAndDelete({username:req.body.username})
    .then((user:any)=>{
        if(user){
            console.log("All good")
            res.send({...user})
        }
        else{
            console.log("something went wrong")
            res.send({ msg: "error" })
        }
    })
    .catch((e:any)=>{
        console.log("There was an error", e)
        res.send({ msg: "error" })
    })
})

export default router