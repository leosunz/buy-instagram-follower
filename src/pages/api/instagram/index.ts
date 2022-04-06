const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
import fetch from 'fetch-with-proxy'
import { apiHandler } from 'helpers/api'
import getConfig from 'next/config'

import connectDB from '@/helpers/api/lib/mongodb'

const { serverRuntimeConfig } = getConfig()

export default connectDB(
  apiHandler({
    get: getUserInfo,
  }),
)

async function getUserInfo(req, res) {
  const { username } = req.query
  if (username === '') {
    throw 'No username given'
  }

  // axios
  //   .get(`https://www.instagram.com/${username}/?__a=1`, {
  //     proxy: {
  //       host: 's1.airproxy.io',
  //       port: 31005,
  //       auth: { username: 'sanjananb', password: 'sanjananb' },
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  const url = `https://www.instagram.com/${username}/?__a=1/sanjananb:sanjananb@s2.airproxy.io:31005`

  fetch(url)
    .then((response) => response.text())
    .then((response) => {
      return res.status(200).json({
        data: response,
      })
    })
    .catch((error) => {
      return res.status(501).json({
        data: {},
      })
    })
}
