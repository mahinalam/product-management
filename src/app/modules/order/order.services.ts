import { IOrder } from './order.interface'
import { Order } from './order.model'

const createOrderIntoDB = async (order: IOrder) => {
  //   if (!(await Order.isProductExists(order.productId))) {
  //     throw new Error('Order Not found!')
  //   }
  const result = await Order.create(order)
  return result
}

const getAllOrdersFromDB = async () => {
  const result = await Order.find()
  return result
}

const getOrderedByEmailFromDB = async (email: string) => {
  const result = await Order.find({ email })
  return result
}

export const orderServices = {
  createOrderIntoDB,
  getOrderedByEmailFromDB,
  getAllOrdersFromDB,
}
