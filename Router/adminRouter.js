const express = require('express')
const adminRouter= express()
const gymController= require('../Controller/gymController')
const UserController= require('../Controller/UserController')
const AdminController= require('../Controller/AdminController')


// gym
adminRouter.post('/insertgym',gymController.InsertGym)
adminRouter.post('/updategym',gymController.EditGym)
adminRouter.get('/get-gymlist',gymController.GetGymList)

// user
adminRouter.post('/insertuser',UserController.InsertUser)
adminRouter.post('/updateuser',UserController.EditUser)
adminRouter.get('/get-userlist',UserController.GetUserList)


// adminlogin
adminRouter.post('/login',AdminController.AdminLogin)




module.exports = adminRouter
