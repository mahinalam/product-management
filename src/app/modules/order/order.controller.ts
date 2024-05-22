import { Request, Response } from 'express'
import { orderServices } from './order.services'
import zodOrderSchema from './order.validation'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body
    const zodParseData = zodOrderSchema.parse(order)

    const result = await orderServices.createOrderIntoDB(zodParseData)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      })
    }
  } catch (err: any) {
    console.log(err)
    res.status(404).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

const getOrderedByEmail = async (req: Request, res: Response) => {
  try {
    const email = req?.query?.email
    console.log('email from order controller', email)
    if (typeof email === 'string') {
      const result = await orderServices.getOrderedByEmailFromDB(email)
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({
      success: false,
      message: 'Failed to create Order!',
    })
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrdersFromDB()
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export const orderController = {
  createOrder,
  getOrderedByEmail,
  getAllOrders,
}
