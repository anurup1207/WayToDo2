const express= require('express')
const router= express.Router();
const {getTimeTable}= require("../controller/getTimeTable")


router.post("/",getTimeTable);


module.exports=router;