import React from 'react'

export default class Intro extends React.PureComponent {
  render () {
    const { loading } = this.props
    return (
      <section>
        <h1>Intro</h1>
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
