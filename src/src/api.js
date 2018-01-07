import axios from 'axios'
import { decodeMatrix } from './utility'

const url = 'https://wt-92cccbcf027a1b4070443ff04b9033cc-0.run.webtask.io/binary-grid-generator'

const defaultParams = {
  side: 5,
  size: 10
}

const get = (params = defaultParams) => {
  return axios.get(url, params)
    .then((response) => response.data.matrices.map(decodeMatrix))
}

const pushResult = (result) => {
  console.log(result)
  // return axios.post(url + '/push-result', result)
}

export default { get, pushResult }
