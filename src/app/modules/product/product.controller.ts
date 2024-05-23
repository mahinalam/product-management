import { Request, Response } from 'express'
import { productServices } from './product.services'
import ZodProductSchema from './product.validation'

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const zodParseData = ZodProductSchema.parse(product)
    const result = await productServices.createProductIntoDB(zodParseData)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product created successfully',
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
    const findDoc = await productServices.updateProductFromDB(
      req.params.productId,
      updatedData.price,
    )
    // console.log('id from product controller', req.params.id)

    if (findDoc) {
      res.status(200).json({
        success: true,
        message: 'Product Updated successfully!',
        data: findDoc,
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
    console.log('deletd', result)

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'Failed to delete product!',
      })
    }
  } catch (err) {
    console.log(err)
  }
}

//search products
const searchProduct = async (req: Request, res: Response) => {
  try {
    const query: any = req.query.searchTerm
    const result = await productServices.searchProductFromDB(query)
    console.log('result from seach product', result)
    if (result && result.length > 0) {
      res.status(200).json({
        success: true,
        message: `Products matching search term ${query} fetched successfully!`,
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
