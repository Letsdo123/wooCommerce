import express from'express'
import { loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword, verifyUser } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { generateImageUrl, generateSignedUrl } from '../controllers/ImageUploadController.js'

// initialization of the router
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/verify-user").post(verifyUser)
router.route("/login-user").post(loginUser)
router.route("/logout-user").put(authenticateToken,logoutUser)
router.route("/request-reset-password").post(requestPasswordReset)
router.route("/reset-password").post(resetPassword)
// router.get('/generate-upload-url',generateImageUrl)
router.post('/generate-upload-url',generateSignedUrl)

export default router