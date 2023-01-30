
const express=require('express')
const router=express.Router()

const {createOpportunity,updateOpportunity,getOpportunityId,getAllOpportunity,getEmailId,applyOpportunity}=require('../controller/opportunity')
const {getUser,getUserById,updateUser,getPatron,updatePatron,registerPatron,getUserByFilter,registerUser,upload}=require('../controller/user')
const {isSignedIn,isAuthenticated,isPatron}=require('../controller/auth')
router.param("userId",getUserById)
router.param("opportunityId",getOpportunityId)
router.param("emailId",getEmailId)

//create or post new opportunity
router.post("/patron/create/opportunity/:userId",createOpportunity)

//update the opportuity
router.put("/patron/update/opportunity/:opportunityId",isSignedIn,isAuthenticated,isPatron,updateOpportunity)

//get all opportunities by patron using the email:
router.get("/patron/opportunity/all/:emailId",getAllOpportunity)

//apply for opportunity
router.put("/user/apply/opportunity/:opportunityId",applyOpportunity) //send parameter in body email of artist and set hired statuus=0
//for eg. 
//{
//     "applied_by":{
//     "emailid":"Saurav54muke@gmai.com",
//     "hired_status":0
//       }
// }



module.exports=router