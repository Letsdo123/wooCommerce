import asyncHandler from 'express-async-handler'
import { ResponseHandler } from '../services/responseHandler.js';
import Approval from '../models/approval.model.js';


export const createApproval = asyncHandler(async(req,res)=>{
    const {entityType,details,documents} = req.body
    const entityId = req.user?.id

    // This is the check-in point for the approval process
    // If the value doesn't come properly then return with error because we can't procssed further
    if(!entityType) return ResponseHandler.error(res,null,"Entity Type is missing",400)
    if(!details) return ResponseHandler.error(res,null,"Details is missing",400)
    if(!documents) return ResponseHandler.error(res,null,"Documents is missing",400)

    // before pushing it to apprpval model
    // we need to check if the entity already has an approval instance
    const existingApproval = await Approval.findOne({entityId,entityType})
    if(existingApproval) return ResponseHandler.error(res,null,"Entity already has an approval instance",400)

    // creating the approval object to push into the Approval collection (mongoDb)
    const approval = {
        entityType,
        entityId,
        details,
        documents
    }
    // This is the approval object that will be pushed into the Approval collection (mongoDb)
    console.log("Approval object into backend",approval);

    // try {
    //     const newApproval = await Approval.create(approval)
    //     console.log("Approval details:",newApproval);
    // } catch (error) {
    //     console.log("Error while creating approval",error);
    // }
    await Approval.create(approval)

    // If the approval is created successfully then return with success message
    return ResponseHandler.success(res,null,"Seller approval pending!!",200)
})