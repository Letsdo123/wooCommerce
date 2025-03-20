import express from'express'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { createCategory, getAllCategories } from '../controllers/product/categoryController.js'

// initialization of the router
const router = express.Router()

// Base url of here 'http://localhost:5000/api/v1/approval'

router.route("/").post(authenticateToken,createCategory)
router.route("/").get(authenticateToken,getAllCategories)
router.route("/:id").get(authenticateToken)
router.route("/:id").put(authenticateToken)
router.route("/:id").delete(authenticateToken)

export default router