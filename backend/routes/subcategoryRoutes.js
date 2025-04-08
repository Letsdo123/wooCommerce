import express from'express'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { createSubcategory, getAllSubcategories } from '../controllers/product/subcategoryController.js'

// initialization of the router
const router = express.Router()

// Base url of here 'http://localhost:5000/api/v1/approval'

router.route("/").post(authenticateToken,createSubcategory)
router.route("/").get(authenticateToken,getAllSubcategories)
router.route("/:id").get(authenticateToken)
router.route("/:id").put(authenticateToken)
router.route("/:id").delete(authenticateToken)

export default router