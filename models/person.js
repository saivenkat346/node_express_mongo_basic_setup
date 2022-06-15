const mongoose =require('mongoose');

const personSchema =mongoose.Schema({
    name:String,
    age:Number,
    gender:String,
    proffision:String,
    hobbies:[{type:String}],

})



module.exports =mongoose.model("Preson",personSchema);