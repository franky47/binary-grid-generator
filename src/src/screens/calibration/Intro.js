import React from 'react'

export default class Intro extends React.PureComponent {
  render () {
    const { loading } = this.props
    return (
      <section className='intro'>
        <h1>Binary Grid <span className='secondary'>|</span> Calibration</h1>
        <p>Todo: add descriptive text here.</p>
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
