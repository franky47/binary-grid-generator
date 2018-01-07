import axios from 'axios'
import { decodeMatrix, getUserId } from './utility'

const defaultParams = {
  side: 5,
  size: 10
}

const get = (params = defaultParams) => {
  const url = 'https://wt-92cccbcf027a1b4070443ff04b9033cc-0.run.webtask.io/binary-grid-generator'
  return axios.get(url, params)
    .then((response) => response.data.matrices.map(decodeMatrix))
}

const pushResult = (result) => {
  const uid = getUserId()
  const url = 'https://wt-92cccbcf027a1b4070443ff04b9033cc-0.run.webtask.io/bgg-calibration-push-result'
  return axios.post(url, { uid, result })
}
}

export default { get, pushResult }
