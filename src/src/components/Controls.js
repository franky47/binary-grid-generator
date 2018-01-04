import React from 'react'
import './Controls.css'

export default class Controls extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      side: 5,
      size: 10
    }

    // Event handlers

    this.onEditSide = this.onEditSide.bind(this)
    this.onEditSize = this.onEditSize.bind(this)
    this.submit = this.submit.bind(this)
  }

  render () {
    return (
      <form onSubmit={this.submit}>
        <label>
          Side
          <input
            type='number'
            min={3}
            max={10}
            value={this.state.side}
            onChange={this.onEditSide}
          />
        </label>

        <label>
          Number to generate
          <input
            type='number'
            min={1}
            max={1000}
            value={this.state.size}
            onChange={this.onEditSize}
          />
        </label>

        <input type='submit' value='Generate' />
      </form>
    )
  }

  // Event handlers --

  onEditSide ({ target }) {
    this.setState({ side: target.value })
  }
  onEditSize ({ target }) {
    this.setState({ size: target.value })
  }

  submit (event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }
}
