import express from'express'
import { authenticateToken } from '../middleware/authMiddleware.js'
import { addProducts, getAllProducts } from '../controllers/product/productController.js'

// initialization of the router
const router = express.Router()

// Base url of here 'http://localhost:5000/api/v1/products'

router.route("/").post(authenticateToken,addProducts)
router.route("/").get(getAllProducts)

export default router