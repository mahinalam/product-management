import express from 'express'
import { orderController } from './order.controller'
const router = express.Router()

router.post('/create-order', orderController.createOrder)
router.get('', orderController.getOrderedByEmail)
router.get('/get-orders', orderController.getAllOrders)

export const orderRoute = router
