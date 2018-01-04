import React from 'react'
import axios from 'axios'
import { decodeMatrix } from './utility'

// Components
import Controls from './components/Controls'
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
      data: null,
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
    return (
      <div className='layout' style={styles}>
        <Controls onSubmit={this.onSubmit} />
        { this.state.loading &&
        <p>Loading</p>
        }
        { this.state.data &&
          <Grid data={this.state.data} />
        }
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
