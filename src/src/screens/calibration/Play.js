import React from 'react'
import PropTypes from 'prop-types'
import Matrix from '../../components/Matrix'
import { getCount, stringifyMatrix, getMatrixDensity, getUserId } from '../../utility'

import './Play.css'

export default class Play extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      chronoStart: 0,
      guess: undefined
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.setState({
      chronoStart: Date.now()
    })
  }

  render () {
    return (
      <section className='play'>
        <Matrix data={this.props.matrix} />
        <form onSubmit={this.onSubmit}>
          <input
            type='number'
            required
            autoFocus
            onChange={this.onChange}
          />
          <input type='submit' />
        </form>
      </section>
    )
  }

  onChange ({ target }) {
    this.setState({
      guess: parseInt(target.value, 10)
    })
  }
  onSubmit (event) {
    const chronoStop = Date.now()
    event.preventDefault()
    const { matrix, submit } = this.props
    const stats = {
      uid: getUserId(),
      rid: this.props.rid,
      matrix: stringifyMatrix(matrix),
      density: getMatrixDensity(matrix),
      side: matrix.length,
      count: getCount(matrix),
      guess: this.state.guess,
      chrono_start: (new Date(this.state.chronoStart)).toISOString(),
      chrono_stop: (new Date(chronoStop)).toISOString(),
      time: (chronoStop - this.state.chronoStart) * 0.001
    }
    stats.correct = stats.guess === stats.count
    submit(stats)
  }
}

Play.propTypes = {
  submit: PropTypes.func,
  matrix: PropTypes.array,
  rid: PropTypes.string
}
