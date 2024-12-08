const express = require('express')
const adminRouter= express()
const gymController= require('../Controller/gymController')


adminRouter.post('/insertgym',gymController.InsertGym)


module.exports = adminRouter
