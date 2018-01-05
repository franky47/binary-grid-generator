import React from 'react'
import axios from 'axios'
import { decodeMatrix, exportData } from './utility'

// Components
import Controls from './components/Controls'
import Analysis from './components/Analysis'
import Grid from './components/Grid'

import styles from './App.css'

const formatData = (data) => {
  return data.matrices.map(decodeMatrix)
}

// --

export default class App extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      data: [[[0,0,1,1,1],[1,0,0,1,0],[1,0,1,1,0],[0,1,0,1,1],[1,0,0,0,0]],[[1,0,1,0,1],[1,0,1,1,1],[0,0,1,1,0],[1,1,1,0,1],[1,1,1,0,0]],[[1,1,1,0,1],[1,0,1,1,0],[0,1,1,1,0],[1,0,0,1,1],[1,1,0,0,1]],[[0,1,0,0,1],[1,1,0,1,0],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,0]],[[0,1,1,1,0],[0,0,1,0,1],[0,1,0,1,1],[1,0,1,1,0],[0,1,1,1,1]],[[0,0,1,0,1],[1,1,0,0,1],[0,0,1,0,0],[0,1,0,1,0],[0,0,0,1,0]],[[1,0,1,0,0],[1,1,1,1,1],[1,0,0,1,0],[0,1,1,1,0],[1,1,1,1,0]],[[0,0,1,0,1],[1,1,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,1,1]],[[0,1,1,1,0],[0,0,1,1,1],[0,0,0,1,0],[0,1,1,1,0],[0,0,1,1,0]],[[1,1,1,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0],[0,1,0,1,0]]],
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
    return (
      <div className='container'>
        <h1>Binary Grid Generator</h1>
        <div className='layout' style={styles}>
          <Controls onSubmit={this.onSubmit} />
          { this.state.data &&
            <Analysis data={this.state.data} />
          }

          <button onClick={exportData}>Render</button>
          { this.state.loading &&
          <p>Loading</p>
          }
          { this.state.data &&
            <Grid data={this.state.data} />
          }
        </div>
      </div>
    )
  }

  onSubmit (params) {
    const url = 'https://wt-92cccbcf027a1b4070443ff04b9033cc-0.run.webtask.io/binary-grid-generator'
    this.setState({ data: null, loading: true })
    axios.get(url, { params })
      .then((response) => {
        this.setState({
          data: formatData(response.data),
          loading: false
        })
      })
  }
}
