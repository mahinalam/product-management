import { Product } from './product.model'
import { IProduct } from './product.interface'

const createProductIntoDB = async (product: IProduct) => {
  if (await Product.isProductExists(product.name)) {
    throw new Error('Product already exists!')
  }

  const result = await Product.create(product)
  return result
}

const getAllProductsFromDB = async () => {
  const result = await Product.find()
  return result
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById({ _id: id })
  return result
}

const updateProductFromDB = async (id: string, price: number) => {
  const findDoc = await Product.findByIdAndUpdate(
    { _id: id },
    { price: price + 10 },
  )
  // const updatedDoc = await Product.findById(id)
  return  findDoc
}

const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id })
  return result
};

const searchProductFromDB = async(searchTerm: string) => {
    const regex = new RegExp(searchTerm, 'i')
    const products = await Product.find({name: regex})
    return products
}

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
  searchProductFromDB
}
