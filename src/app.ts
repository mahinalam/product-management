import express, { Application } from 'express'
import cors from 'cors'
import { productRoute } from './app/modules/product/product.route'
import { orderRoute } from './app/modules/order/order.route'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)

export default app
