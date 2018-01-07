import './css/index.css'

import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { setUserId } from './utility'

setUserId()

render(<App />, document.getElementById('root'))
