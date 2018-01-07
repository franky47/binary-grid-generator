import React from 'react'
import PropTypes from 'prop-types'

export default class Summary extends React.PureComponent {
  render () {
    const { bestTime, worstTime, averageTime, numCompleted, numTotal, numCorrect } = this.props
    const completionRate = (numCompleted / numTotal) * 100
    const successRate = (numCorrect / numCompleted) * 100
    return (
      <section>
        <h3>Stats</h3>
        <p>Best time: {bestTime}s</p>
        <p>Worst time: {worstTime}s</p>
        <p>Average time: {averageTime}</p>
        <p>Completion rate: {completionRate}% ({numCompleted} / {numTotal})</p>
        <p>Success rate: {successRate}% ({numCorrect} / {numCompleted})</p>
        { /* todo: add field to leave a comment */ }
        <button>Play again</button>
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
