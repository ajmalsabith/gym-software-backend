const express = require('express')
const adminRouter= express()
const gymController= require('../Controller/gymController')


adminRouter.post('/insertgym',gymController.InsertGym)
adminRouter.post('/updategym',gymController.EditGym)
adminRouter.get('/get-gymlist',gymController.GetGymList)


module.exports = adminRouter
