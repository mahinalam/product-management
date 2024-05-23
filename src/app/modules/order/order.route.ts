import express from 'express'
import { orderController } from './order.controller'
const router = express.Router()

router.post('/create-order', orderController.createOrder)
router.get('', orderController.getOrderedByEmail)
router.get('/get-orders', orderController.getAllOrders)
router.all('*', orderController.notFoundRoute)

export const orderRoute = router
