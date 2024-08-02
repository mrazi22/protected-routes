const express = require("express");
 const regroutes = require("./routtes/regRoutes");
 const cors = require("cors")



const app = express();

 require('dotenv').config()
 require('./helpers/init_mongodb')

app.use(express.json());
app.use(cors({
    origin : 'http://localhost:3000'
}))
 app.use(regroutes)







app.listen(5000, () => console.log("server running on port 5000"));