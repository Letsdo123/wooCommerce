import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema({
    entityType:{
        type:String,
        enum:['User','Product'],
        required:true
    },
    entityId:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        default:null
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    comments: {
        type: String, // Admin comments on approval/rejection
        default: '',
    },
},{timestamps:true})

const Approval = mongoose.model('Approval',approvalSchema)
export default Approval