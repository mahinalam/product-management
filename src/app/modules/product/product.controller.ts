import { Request, Response } from 'express'
import { productServices } from './product.services'
import ZodProductSchema from './product.validation'

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body
    const zodParseData = ZodProductSchema.parse(product)
    console.log(zodParseData)
    const result = await productServices.createProductIntoDB(zodParseData)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product is created successfully',
        data: result,
      })
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({
      success: false,
      message: 'Failed to create product!',
    })
  }
}

//get all products
const getAllProducts = async (req: Request, res: Response) => {
  const result = await productServices.getAllProductsFromDB()
  if (result) {
    try {
      const result = await productServices.getAllProductsFromDB()
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: result,
        })
      }
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Failed to retrieved products!',
      })
    }
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getSingleProductFromDB(
      req.params.productId,
    )
    console.log(result)
    if (result) {
      res.status(200).json({
        success: true,
        message: ' Product fetched successfully!',
        data: result,
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Failed to retrieved product!',
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body
    const { updatedDoc } = await productServices.updateProductFromDB(
      req.params.productId,
      updatedData.price,
    )
    // console.log('id from product controller', req.params.id)

    if (updatedDoc) {
      res.status(200).json({
        success: true,
        message: 'Product Updated successfully!',
        data: updatedDoc,
      })
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({
      success: false,
      message: 'Failed to Update product!',
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.deleteProductFromDB(
      req.params.productId,
    )
    console.log(result)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Failed to delete product!',
    })
  }
}

//search products
const searchProduct = async (req: Request, res: Response) => {
  try {
    const query: any = req.query.searchTerm
    const result = await productServices.searchProductFromDB(query)
    if (result) {
      res.status(200).json({
        success: true,
        message: "Products matching search term 'iphone' fetched successfully!",
        data: result,
      })
    }
    // return products
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Products are not match from  search term 'iphone'!",
    })
    throw err
  }
}

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
}
