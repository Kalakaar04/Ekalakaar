const User = require('../models/user')
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("../package")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "uploads");    
    
  },
  filename: function (req, file, cb) {
 
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
exports.upload = multer({ storage: storage });


exports.getUserById=(req,res,next,id)=>{
    req.profile=0
    
    User.findById(id).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB BY ID"
            })
        }
       
       
        req.profile=user;
        
        next();
    })
}
exports.getUserByEmail=(req,res,next,id)=>{

    User.find({"email":id,role:0,isRegistered:true}).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB BY ID"
            })
        }
       
       
        req.profile=user;
        next();
    })
}
exports.getUser= async (req,res)=>{

    
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    req.profile.patron=undefined;
    res.json(req.profile);
   
}

exports.getByEmail=async(req,res)=>{



    req.profile[0].salt=undefined;
    req.profile[0].encry_password=undefined;
    req.profile[0].createdAt=undefined;
    req.profile[0].updatedAt=undefined;
    req.profile[0].patron=undefined;
    req.profile[0].isRegistered=false
   
     return res.json(req.profile);

}
//update artist user 
exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true},
        {useFindAndModify:false},(err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this."
                })
            }
            user.salt=undefined
            user.encry_password=undefined
            res.json(user)

        }
        )
}

//Controller for artist registration
exports.registerUser=(req,res)=>{
  
   /* const obj = {
        photo: {
            data: fs.readFileSync(require.resolve("../uploads/"+req.file.filename), { encoding: "utf8" }),
            contentType: "image/jpg"
        }
    }
    req.body.photo=obj.photo*/
 //console.log(obj.photo)
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {artist:req.body,isRegistered:true},
        {new:true,useFindAndModify:true},
        (err,user)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    error:"You are not authorized to update this."
                })
            }
          //  user.artist.photo=obj.photo

            user.salt=undefined
            user.encry_password=undefined
            user.createdAt=undefined
            user.updatedAt=undefined
           
            res.json(user)

        }
        )
}

//controller for updating patron
exports.updatePatron=(req,res)=>{

    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:true},(err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this."
                })
            }
            user.salt=undefined
            user.encry_password=undefined
            res.json(user)

        }
        )
}

//controller for registering patron
exports.registerPatron=(req,res)=>{
   
   // let filter={patron:req.body}
   console.log(req.body);
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {patron:req.body,isRegistered:true},
        {new:true,useFindAndModify:true},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this."
                })
            }
            user.salt=undefined
            user.encry_password=undefined
            user.createdAt=undefined
            user.updatedAt=undefined
            res.json(user)

        }
        )
}

//get patron details
exports.getPatron=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;

    return res.json(req.profile)
}

exports.getUserByFilter=(req,res)=>{
console.log(req.body)
    User.find(req.body).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"No Record found By Filter"
            })
        }
       
       return res.json(user);
    })
}

