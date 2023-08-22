const express = require("express");
const cors = require('cors');
const app = express()
require("dotenv").config()
app.use(express.json())
app.use(cors());

const {userRouter} = require("./Routes/User.route")
const {employeeRouter} = require("./Routes/Employee.route")


const {connection} = require("./db")

app.get("/", (req,res) =>{
    res.send("Welcome to Backend of Employee Management")
})

app.use("/api", userRouter)
app.use("/api",employeeRouter)

app.listen(8080, async ()=>{
    try{
        await connection
        console.log("Connected to DB")
    } catch(err){
        console.log(err.message)
    }
    console.log(`Server is listening at port 8080`)
})
