import React from 'react'
import PropTypes from 'prop-types'

export default class Summary extends React.PureComponent {
  render () {
    const { bestTime, worstTime, averageTime, numCompleted, numTotal, numCorrect } = this.props
    const completionRate = ((numCompleted / numTotal) * 100).toFixed()
    const successRate = ((numCorrect / numCompleted) * 100).toFixed()
    return (
      <section>
        <h3>Statistics</h3>
        <p>Best time: <b>{bestTime.toFixed(2)}s</b></p>
        <p>Worst time: <b>{worstTime.toFixed(2)}s</b></p>
        <p>Average time: <b>{averageTime.toFixed(2)}s</b></p>
        <p>Completion rate: <b>{completionRate}%</b> <span className='secondary'>({numCompleted} / {numTotal})</span></p>
        <p>Success rate: <b>{successRate}%</b> <span className='secondary'>({numCorrect} / {numCompleted})</span></p>
        { /* todo: add field to leave a comment */ }
        {/* <button>Play again</button> */}
      </section>
    )
  }
}

Summary.propTypes = {
  bestTime: PropTypes.number,
  worstTime: PropTypes.number,
  averageTime: PropTypes.number,
  numCompleted: PropTypes.number,
  numTotal: PropTypes.number,
  numCorrect: PropTypes.number
}
