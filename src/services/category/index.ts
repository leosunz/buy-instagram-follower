import { fetchWrapper } from 'helpers'
import getConfig from 'next/config'
import Router from 'next/router'
import { BehaviorSubject } from 'rxjs'

const { publicRuntimeConfig } = getConfig()

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('user')!),
)

export const categoryService = {
  create,
  update,
  _delete,
  search,
  deleteMany,
  deleteInactive,
}

function search(keyword) {
  return fetchWrapper
    .get(`${publicRuntimeConfig.apiUrl}/category?keyword=${keyword}`)
    .then((categories) => {
      return categories
    })
}

function create(data) {
  return fetchWrapper
    .post(`${publicRuntimeConfig.apiUrl}/category`, data)
    .then((category) => {
      return category
    })
}

function update(data) {
  return fetchWrapper
    .put(`${publicRuntimeConfig.apiUrl}/category`, data)
    .then((category) => {
      return category
    })
}

function _delete(_id) {
  return fetchWrapper
    .delete(
      `${publicRuntimeConfig.apiUrl}/category/delete?_type=one&_id=${_id}`,
    )
    .then((data) => {
      return data
    })
}

function deleteInactive() {
  return fetchWrapper
    .delete(`${publicRuntimeConfig.apiUrl}/category/delete?_type=inactive`)
    .then((data) => {
      return data
    })
}

function deleteMany(_ids) {
  return fetchWrapper
    .post(`${publicRuntimeConfig.apiUrl}/category/delete`, { _ids: _ids })
    .then((data) => {
      return data
    })
}