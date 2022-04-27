const express = require('express');
const app = express();
const userControler = require('./controllers/user.controller');
const connect = require('./configs/db');

app.use(express.json());
app.use("/users" , userControler)

app.listen(8000, async()=>{
    try{
         await connect()
        console.log('running on port 8000')
    }
    catch(err){
        console.log(err.message);
    }
})