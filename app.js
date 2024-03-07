const express= require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const getTimeTableRoute = require("./routes/getTimeTableRoute");

// All my routes
app.use("/getTimeTable", getTimeTableRoute);


const PORT=3000;
app.listen(PORT,()=>{
    console.log(`The server is running in ${PORT}`);
})
