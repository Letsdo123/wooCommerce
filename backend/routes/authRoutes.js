import express from'express'
import { createRole, getAllRoles, getUserApprovalDetails, getUserDetails, loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword, verifyUser } from '../controllers/authController.js'
import { authenticateToken, restrictTo } from '../middleware/authMiddleware.js'
import { generateSignedUrl, getSignedPdfUrl } from '../controllers/ImageUploadController.js'

// initialization of the router
const router = express.Router()

// Base url of here 'http://localhost:5000/api/v1/auth'

router.route("/register").post(registerUser)
router.route("/verify").post(verifyUser)
router.route("/login").post(loginUser)
router.route("/logout").put(authenticateToken,logoutUser)
router.route("/request-reset-password").post(requestPasswordReset)
router.route("/reset-password").post(resetPassword)
// router.get('/generate-upload-url',generateImageUrl)
router.post('/generate-upload-url',generateSignedUrl)
router.post('/retrive-upload-url',getSignedPdfUrl)

// handling the roles routes
router.route("/add-role").post(authenticateToken,createRole)
router.route("/get-role").get(getAllRoles)

// handilg the approval details
router.route("/get-user-approval").get(authenticateToken,()=>{restrictTo(1)},getUserApprovalDetails)

// handing the user details
router.route("/get-user-details").post(authenticateToken,getUserDetails)

export default router