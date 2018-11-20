import React from 'react'
import PropTypes from 'prop-types'

export default class Summary extends React.PureComponent {
  render () {
    const { bestTime, worstTime, averageTime, totalTime, numCompleted, numTotal, numCorrect } = this.props
    const completionRate = ((numCompleted / numTotal) * 100).toFixed()
    const successRate = ((numCorrect / numCompleted) * 100).toFixed()
    return (
      <section>
        <h3>Statistiques</h3>
        <p>Meilleur temps : <b>{bestTime.toFixed(2)}s</b></p>
        <p>Pire temps : <b>{worstTime.toFixed(2)}s</b></p>
        <p>Temps moyen : <b>{averageTime.toFixed(2)}s</b></p>
        <p>Temps cumulé : <b>{totalTime.toFixed(2)}s</b></p>
        <p>Pourcentage terminé : <b>{completionRate}%</b> <span className='secondary'>({numCompleted} / {numTotal})</span></p>
        <p>Pourcentage réussi : <b>{successRate}%</b> <span className='secondary'>({numCorrect} / {numCompleted})</span></p>
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
  totalTime: PropTypes.number,
  numCompleted: PropTypes.number,
  numTotal: PropTypes.number,
  numCorrect: PropTypes.number
}
