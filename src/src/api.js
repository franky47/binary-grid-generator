import axios from 'axios'
import { decodeMatrix, getUserId } from './utility'

const defaultParams = {
  side: 7,
  size: 20
}

/**
 * Shuffles array in place. ES6 version of the Fisher - Yates shuffle
 * @param {Array} a items - An array containing the items.
 */
// const shuffle = (a) => {
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1))
//     ;[a[i], a[j]] = [a[j], a[i]]
//   }
//   return a
// }

const get = (params = defaultParams) => {
  const url = 'https://wt-92cccbcf027a1b4070443ff04b9033cc-0.run.webtask.io/binary-grid-generator'
  return axios.get(url, { params })
    .then((response) => response.data.matrices.map(decodeMatrix))
}

const pushResult = (result) => {
  const uid = getUserId()
  const url = 'https://wt-92cccbcf027a1b4070443ff04b9033cc-0.run.webtask.io/bgg-calibration-push-result'
  return axios.post(url, { uid, result })
}

const aggregate = () => {
  return get({ side: 9, size: 80, mindp: 0.3, maxdp: 0.7 })
}

// const aggregate = () => {
//   return Promise.all([
//     get({ side: 6, size: 20, mindp: 0, maxdp: 1 }),
//     get({ side: 7, size: 20, mindp: 0, maxdp: 1 }),
//     get({ side: 8, size: 20, mindp: 0, maxdp: 1 })
//   ])
//   .then(([s6, s7, s8]) => [...s6, ...s7, ...s8]) // Combine
//   .then((array) => shuffle(array))
// }

export default { get, aggregate, pushResult }
