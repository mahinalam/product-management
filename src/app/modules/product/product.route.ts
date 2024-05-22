import express from 'express'
import { productController } from './product.controller'
const router = express.Router()

router.post('/create-product', productController.createProduct)
router.get('/get-products', productController.getAllProducts)
router.get('/:productId', productController.getSingleProduct)
router.get('/', productController.searchProduct)
router.put('/:productId', productController.updateProduct)
router.delete('/:productId', productController.deleteProduct)

export const productRoute = router
