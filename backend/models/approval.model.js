import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema({
    entityType: {
        type: String,
        enum: ['User', 'Product'],
        required: true
    },
    entityId: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    details: {
        type: Object,
        required: true
    },
    documents: [
        {
            // e.g "Aadhar Card" , "Pan Card" , "GST Certificate"
            documentType: {
                type: String,
                required: true
            },
            // This is the public id that will help to update or remove the documnets from cloudinary
            publicId: {
                type: String,
                required: true
            },
            // This contains the file type like "pdf" , "image" , "video" etc
            fileType : {
                type : String,
                enum:['raw','image','video'],
                required : true
            }
        }
    ],
    adminId: {
        type: Number,
        default: null
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
    reapplyAfter: {
        type: Date, // Date after which user can reapply
        default: null
    }
}, { timestamps: true })

const Approval = mongoose.model('Approval', approvalSchema)
export default Approval