import express from "express"


const port = process.env.PORT || 6000;

const app = express();


app.get("/",(req,res)=>{
    res.status(200).json({message: "Welcome to AI Content Genrator Server"})
})
//Server Start
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})