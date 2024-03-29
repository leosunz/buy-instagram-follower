import { createReducer } from '@reduxjs/toolkit'

import {
  activeCategories,
  addCategory,
  deactiveCategories,
  removeCategories,
  removeCategory,
  setCategories,
  updateCategory,
} from './actions'

type AdminCategoryState = {
  categories: any[]
}

const initialState: AdminCategoryState = {
  categories: [],
}

export const adminCategoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCategories, (state, action) => {
    state.categories = action.payload
  })
  builder.addCase(addCategory, (state, action) => {
    state.categories = [...state.categories, action.payload]
  })
  builder.addCase(removeCategory, (state, action) => {
    const category = action.payload
    const categoryList = [
      ...state.categories.filter((item) => item._id !== category._id),
    ]
    state.categories = categoryList
  })
  builder.addCase(removeCategories, (state, action) => {
    const removedIds = action.payload
    const categoryList = [
      ...state.categories.filter((item) => !removedIds.includes(item._id)),
    ]
    state.categories = categoryList
  })
  builder.addCase(updateCategory, (state, action) => {
    const category = action.payload
    const categoryList = [
      ...state.categories.map((item) => {
        if (item._id === category._id) {
          item.name = category.name
          item.checkoutCode = category.checkoutCode
          item.requiredField = category.requiredField
          item.socialNetwork = category.socialNetwork
          item.defaultSortingNumber = category.defaultSortingNumber
          item.isActive = category.isActive
          item.offerDiscount = category.offerDiscount
          item.pageTitle = category.pageTitle
          item.urlSlug = category.urlSlug
          item.metaKeywords = category.metaKeywords
          item.metaDescription = category.metaDescription
          item.content = category.content
          return item
        } else {
          return item
        }
      }),
    ]
  })
  builder.addCase(deactiveCategories, (state, action) => {
    const deactivatedIds = action.payload
    const categoryList = [
      ...state.categories.map((item) => {
        if (deactivatedIds.includes(item._id)) {
          item.isActive = false
          return item
        } else {
          return item
        }
      }),
    ]
  })
  builder.addCase(activeCategories, (state, action) => {
    const activatedIds = action.payload
    const categoryList = [
      ...state.categories.map((item) => {
        if (activatedIds.includes(item._id)) {
          item.isActive = true
          return item
        } else {
          return item
        }
      }),
    ]
  })
})
