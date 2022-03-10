const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
import { apiHandler, categoryRepo } from 'helpers/api'
import getConfig from 'next/config'

import connectDB from '@/helpers/api/lib/mongodb'

const { serverRuntimeConfig } = getConfig()

export default connectDB(
  apiHandler({
    post: createCategory,
    get: searchCategories,
    delete: deleteCategory,
    put: updateCategory,
  }),
)

async function createCategory(req, res) {
  console.log('Creating, Cookies =>', req.cookies)
  const {
    name,
    content,
    checkoutCode,
    requiredField,
    socialNetwork,
    defaultSortingNumber,
    status,
    offerDiscount,
    urlSlug,
    pageTitle,
    metaKeywords,
    metaDescription,
    _id,
  } = req.body
  const categoryOne = await categoryRepo.find({ name: name })
  if (!categoryOne) {
    const categoryAdded = await categoryRepo
      .create({
        name: name,
        content: content,
        checkoutCode: checkoutCode,
        requiredField: requiredField,
        socialNetwork: socialNetwork,
        defaultSortingNumber: defaultSortingNumber,
        isActive: status === 'active' ? true : false,
        offerDiscount: offerDiscount,
        urlSlug: urlSlug,
        pageTitle: pageTitle,
        metaKeywords: metaKeywords,
        metaDescription: metaDescription,
      })
      .catch((err) => {
        return res.status(500).json({
          msg: 'Error occured during save in database.',
          error: 500,
        })
      })
    return res.status(200).json({
      data: categoryAdded,
    })
  } else {
    return res.status(417).json({
      error: 'duplication',
      msg: 'Category you are going to add does already exists',
    })
  }
}

async function updateCategory(req, res) {
  console.log('Updating, Cookies =>', req.cookies)
  const {
    name,
    content,
    checkoutCode,
    requiredField,
    socialNetwork,
    defaultSortingNumber,
    status,
    offerDiscount,
    urlSlug,
    pageTitle,
    metaKeywords,
    metaDescription,
    _id,
  } = req.body
  const updatedOne = await categoryRepo.update(_id, {
    name: name,
    content: content,
    checkoutCode: checkoutCode,
    requiredField: requiredField,
    socialNetwork: socialNetwork,
    defaultSortingNumber: defaultSortingNumber,
    isActive: status === 'active' ? true : false,
    offerDiscount: offerDiscount,
    urlSlug: urlSlug,
    pageTitle: pageTitle,
    metaKeywords: metaKeywords,
    metaDescription: metaDescription,
  })
  console.log('Updated Category =>', updatedOne)
  return res.status(200).json({
    status: 'success',
    data: updatedOne,
  })
}

async function searchCategories(req, res) {
  console.log('Cookies =>', req.cookies)
  const { keyword } = req.query
  if (keyword === '') {
    const categories = await categoryRepo.getAll()
    return res.status(200).json({
      data: categories,
      count: categories.length,
    })
  }

  const categoryOne = await categoryRepo.find({ name: keyword })
  if (!categoryOne) {
    return res.status(200).json({
      data: {},
    })
  }
  return res.status(200).json({
    data: categoryOne,
  })
}
async function deleteCategory(req, res) {
  console.log('Cookies =>', req.cookies)
  const { _id } = req.query
  if (_id === '' || _id === undefined) {
    throw 'The id of Category is not defined'
  }

  await categoryRepo.delete(_id)
  return res.status(200).json({
    status: 'success',
    removedId: _id,
  })
}
