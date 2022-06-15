const express =require('express');
const mongoose =require("mongoose");
const app=express();

app.use(express.json());

mongoose.connect("mongodb://localhost/Person",
()=>{
    console.log("database is connected");
}
);


app.listen(3000,()=>{
   console.log("the server is connected to port 3000")
})