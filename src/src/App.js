import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Screens
import Generator from './screens/Generator'
import Calibration from './screens/calibration'

const Root = () => (
  <ul>
    <li><Link to='/generator'>Generator</Link></li>
    <li><Link to='/calibration'>Calibration</Link></li>
  </ul>
)

export default class App extends React.PureComponent {
  render () {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' component={Root} />
          <Route path='/generator' component={Generator} />
          <Route path='/calibration' component={Calibration} />
        </div>
      </Router>
    )
  }
}
