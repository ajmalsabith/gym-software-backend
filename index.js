const mongoose= require('mongoose')
 require('dotenv').config()
const express=require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter= require('./Router/userRouter')
const adminRouter= require('./Router/adminRouter')
const apiauth= require('./Auth/apiAuth');
const CommonApiRoutes = require('./Router/CommonRoutesApis');
const app=express()


app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}))

app.use(cookieParser());
app.use(express.json());




app.use('/',userRouter)
app.use('/admin', apiauth, adminRouter);
app.use('/common', apiauth, CommonApiRoutes);


// mongoose.connect(process.env.mongoConnectionString);
// const connection = mongoose.connection;
// connection.on('connected', () => console.log('mongoDB connected'));
// connection.on('error', (error) => console.log('mongodb connection fail', error));

mongoose.connect(process.env.mongodburinew)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Database connection error:', err));


// mongoose.connect(process.env.mongoConnectionString).then(()=>{
//     console.log('database successs..');
    
// })

app.listen(3400,()=>{
    console.log('server running on port 3400...');
    
})