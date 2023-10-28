const express=require("express")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const root=require("./root")
const app=express();

// db con
mongoose.connect("mongodb://localhost:27017/login",{useNewUrlParser: true})
const db=mongoose.connection;
db.on("error",()=>{console.log("the error in found")})
db.once("open", () => { console.log("connected") });


app.set("view engine","ejs")

app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use("/",root)

const PORT=process.env.PORT||8000
app.listen(PORT,()=>console.log(`hosted at http://localhost:${PORT}`))