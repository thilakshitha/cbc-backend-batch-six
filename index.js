import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken"
import productRouter from "./routers/productRouter.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
import dns from "node:dns";





const app = express()

//default body parser by the express(middleware)
app.use(bodyParser.json())

//customized middleware
app.use((req,res,next)=>{
  const value = req.header("Authorization")
  if(value != null){
    const token = value.replace("Bearer ","")
    jwt.verify(token,process.env.JWT_TOKEN,(err,decoded)=>{
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

const connectionString = process.env.MONGO_URI


mongoose.connect(connectionString).then(()=>{
    console.log("db connected")
}).catch((e)=>{
    console.log(e)
    console.log("not connected")
})



app.use("/api/users",userRouter)
app.use("/api/products",productRouter)






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