import express from'express'
import { createApproval } from '../controllers/approvalController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

// initialization of the router
const router = express.Router()

// Base url of here 'http://localhost:5000/api/v1/approval'

router.route("/user").post(authenticateToken,createApproval)

export default router