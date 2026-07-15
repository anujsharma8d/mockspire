const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const interviewRoutes = require("./routes/interviewRoutes")
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/questions", interviewRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})