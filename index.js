import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import Student from "./models/student.js";
import studentRouter from "./routers/studentRouter.js";
import dns from "node:dns";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken"

dns.setServers(["1.1.1.1", "8.8.8.8"]);




const app = express()

//default body parser by the express(middleware)
app.use(bodyParser.json())

//customized middleware
app.use((req,res,next)=>{
  const value = req.header("Authorization")
  if(value != null){
    const token = value.replace("Bearer ","")
    jwt.verify(token,"cbc-6503",(err,decoded)=>{
        if(decoded == null){
            res.status(403).json({
                message: "unauthorized"
            })
        }else{
            req.user = decoded
            next()
        }
        console.log(decoded)
    })
    console.log(token)
  }else{
       next()
  }
  
  
})

const connectionString = "mongodb+srv://thilakshithapriyangana2001_db_user:7OSA8pVgGezpQakk@cluster11.yano9m8.mongodb.net/?appName=Cluster11";


mongoose.connect(connectionString).then(()=>{
    console.log("db connected")
}).catch(()=>{
    console.log("not connected")
})


app.use("/students",studentRouter)
app.use("/users",userRouter)






app.delete("/",(req,res)=>{
    res.json({
        message:"this is a delete response"
    })
    console.log("thi is a delete rrequest")
})

app.put("/",(req,res)=>{
    res.json({
        message:"this is a put response"
    })
    console.log("this is a put request")
})



app.listen(5000,()=>{
    console.log("server is running");
    
})