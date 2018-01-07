import React from 'react'
import { exportData } from '../utility'
import api from '../api'

// Components
import Controls from '../components/Controls'
import Analysis from '../components/Analysis'
import Grid from '../components/Grid'

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
        <div className='layout'>
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
    this.setState({
      loading: true
    })
    api.get(params).then((data) => {
      this.setState({
        data,
        loading: false
      })
    })
  }
}
