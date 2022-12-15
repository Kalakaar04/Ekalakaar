const Opportunity=require("../models/opportunity")

//middleware for getting all record by email of patron
exports.getEmailId=(req,res,next,id)=>{
    
    Opportunity.find({posted_by_email:id}).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB BY ID"
            })
        }
       
       
        req.profile=user;
        next();
    })
}


//all opportunities posted by the patron
exports.getAllOpportunity=(req,res)=>{
    return res.json(req.profile)
}


//middlware for getting opportunity by opportunity id
exports.getOpportunityId=(req,res,next,id)=>{

    Opportunity.findById(id).exec((err,result)=>{

        if(err || !result){
            return res.status(400).json({
                error:"No user was found in DB BY ID"
            })
        }
       
       
        req.profile=result;
        next();
    })
}


//create opportunity by patron
exports.createOpportunity=(req,res)=>{
    
    const opportunity=new Opportunity(req.body)
    
    opportunity.save((err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                err:" Not able to save user in DB"
            })
           
        }
        
        res.json({
            posted_by_email:result.posted_by_email,
            id:result._id

        })
    })
    
}

exports.updateOpportunity=(req,res)=>{   
    console.log(req.body)
Opportunity.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},(err,result)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this."
                })
            }
            result.salt=undefined
            result.encry_password=undefined
            res.json(result)

        }
        )
}

exports.applyOpportunity=(req,res)=>{
    Opportunity.findByIdAndUpdate(
        {_id:req.profile._id},
        {$push:req.body},
        {new:true,useFindAndModify:false},(err,result)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this."
                })
            }
            result.salt=undefined
            result.encry_password=undefined
            res.json(result)

        }
        )
}

