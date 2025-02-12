import express from'express'
import { getMenuItems } from '../controllers/menuController.js'

// initialization of the router
const router = express.Router()

// Base url of here 'http://localhost:5000/api/v1/admin/dasboard'

router.route("/menus").get(getMenuItems)

export default router