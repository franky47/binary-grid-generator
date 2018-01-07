import React from 'react'
import './Intro.css'

export default class Intro extends React.PureComponent {
  render () {
    const { loading } = this.props
    return (
      <section className='intro'>
        <h1>Binary Grid <span className='secondary separator'>|</span> Calibration</h1>
        <p>Count the ones as fast as you can !</p>
        { loading &&
          <p>Loading</p>
        }
        { !loading &&
          <button onClick={this.props.next}>Start</button>
        }
      </section>
    )
  }
}
