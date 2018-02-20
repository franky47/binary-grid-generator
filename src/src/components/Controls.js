import React from 'react'
import './Controls.css'

export default class Controls extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      side: 5,
      size: 10,
      mindp: 0.25,
      maxdp: 0.75
    }

    // Event handlers

    this.onEditSide = this.onEditSide.bind(this)
    this.onEditSize = this.onEditSize.bind(this)
    this.onEditMinDp = this.onEditMinDp.bind(this)
    this.onEditMaxDp = this.onEditMaxDp.bind(this)
    this.submit = this.submit.bind(this)
  }

  render () {
    return (
      <form onSubmit={this.submit}>
        <label>
          Square size
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

        <label>
          Minimum density (%)
          <input
            type='number'
            min={0}
            max={100}
            value={Math.round(this.state.mindp * 100)}
            onChange={this.onEditMinDp}
          />
        </label>

        <label>
          Maximum density (%)
          <input
            type='number'
            min={0}
            max={100}
            value={Math.round(this.state.maxdp * 100)}
            onChange={this.onEditMaxDp}
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
  onEditMinDp ({ target }) {
    this.setState({ mindp: target.value * 0.01 })
  }
  onEditMaxDp ({ target }) {
    this.setState({ maxdp: target.value * 0.01 })
  }

  submit (event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }
}
