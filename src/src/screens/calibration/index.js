import React from 'react'
import api from '../../api'
import { computeStats } from './stats'

import Intro from './Intro'
import Play from './Play'
import Result from './Result'
import Summary from './Summary'

import './index.css'

export default class Calibration extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      initialNumMatrices: 0,
      stage: 'intro',
      matrices: [],
      results: [],
      loading: false,
      currentMatrix: undefined,
      rid: null
    }

    this.nextGame = this.nextGame.bind(this)
    this.submitGuess = this.submitGuess.bind(this)
    this.done = this.done.bind(this)
  }

  render () {
    return (
      <div className='calibration'>
        { this.renderScreen() }
      </div>
    )
  }

  renderScreen () {
    switch (this.state.stage) {
      case 'intro':
        return <Intro
          next={this.nextGame}
          updateRunId={this.updateRunId}
          loading={this.state.loading}
        />
      case 'play':
        return <Play
          matrix={this.state.currentMatrix}
          submit={this.submitGuess}
          rid={this.state.rid}
        />
      case 'result':
        const { guess, count, time } = this.state.results[this.state.results.length - 1]
        return <Result
          guess={guess}
          count={count}
          time={time}
          next={this.nextGame}
          done={this.done}
          showNext={this.state.matrices.length > 0}
        />
      case 'summary':
        const {
          bestTime, worstTime, averageTime, totalTime, numCompleted, numTotal, numCorrect
        } = computeStats(this.state.results)
        return <Summary
          bestTime={bestTime}
          worstTime={worstTime}
          averageTime={averageTime}
          totalTime={totalTime}
          numCompleted={numCompleted}
          numTotal={numTotal}
          numCorrect={numCorrect}
        />
      default:
        return <h1>Error: invalid stage: {this.state.stage}</h1>
    }
  }

  // State Machine Events --

  componentDidMount () {
    this.setState({ loading: true })
    api.aggregate().then((matrices) => {
      this.setState({
        initialNumMatrices: matrices.length,
        matrices,
        loading: false
      })
    })
  }

  updateRunId = (rid) => {
    this.setState({ rid })
  }

  nextGame () {
    const matrices = [...this.state.matrices] // Make a copy
    const matrix = matrices.splice(0, 1)[0]
    this.setState({
      stage: 'play',
      currentMatrix: matrix,
      matrices
    })
  }
  submitGuess (result) {
    const correct = result.count === result.guess
    const r = Object.assign({}, result, {
      correct,
      completion: {
        number: this.state.initialNumMatrices - this.state.matrices.length,
        of: this.state.initialNumMatrices
      }
    })
    api.pushResult(r)
    this.setState({
      results: [...this.state.results, r],
      stage: 'result'
    })
  }
  done () {
    this.setState({
      stage: 'summary'
    })
  }
}
