const express =require("express");
const Router =express.Router();
const personmodel =require('../models/person');

Router.get('/',async (req,res)=>{
    try{
        
        const allperson =await personmodel.find();
       
        res.json(allperson)

    }catch(e){
        res.status(500).json({message:e.message});
    }
    
})


Router.post('/createperson',async (req,res)=>{
    const newperson ={
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        proffision:req.body.proffision,
        hobbies:req.body.hobbies

    }
    try{
       const createdperson =await personmodel.create(newperson);

       res.status(201).json(createdperson);

    }catch(e){
        res.status(203).json({message:e.message});
    }
})

Router.route('/:id')
.get(findpersonbyid,(req,res)=>{
   if(res.person==null){
    res.status(404).json({message:"person not found"});
   }else{
     res.json(res.person);
   }
})
.delete(findpersonbyid,async (req,res)=>{
    try{

       const deletedperson =await personmodel.findByIdAndDelete(res.person.id);
       res.json(deletedperson);

    }catch(e){
       res.status(404).json({message:e.message});
    }
})
.patch(findpersonbyid,async (req,res)=>{
    if(req.body.name!=null){
        res.person.name=req.body.name;
    }
    if(req.body.age!=null){
        res.person.age=req.body.age;
    }
    if(req.body.gender!=null){
        res.person.gender=req.body.gender;
    }
    if(req.body.proffision!=null){
        res.person.proffision=req.body.proffision;
    }
    if(req.body.hobbies!=null){
        res.person.hobbies=req.body.hobbies;
    }
    try{
        const updatedperson =await res.person.save();
        res.json(updatedperson);

    }catch(e){
        res.status(500).json({message:e.message});
    }
})


async function findpersonbyid(req,res,next){
    let personfound;
    try{
        try{
            personfound =await personmodel.findById(req.params.id);
        }catch(e){
            res.status(404).json({message:e.message});
        }

    }catch(e){
            res.status(404).json({message:e.message});
    }
    res.person =personfound;
    next();
}


module.exports=Router;