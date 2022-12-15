const express = require('express')

const app = express()

require('dotenv').config()

const port = 4000

const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const opportunityRoutes=require('./routes/opportunity')

const mongoose = require('mongoose');
//Set up default mongoose connection

const bodyParser=require('body-parser')
const cookieParser =require('cookie-parser')
const cors=require('cors')

app.use(express.static("public"))

//app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json())
app.use(cors())



mongoose.set('strictQuery', true);
//Database connection

mongoose.connect(process.env.MONGODB).then(()=>{
console.log("DB Connected");
});

//using middlewares 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",opportunityRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






