import React from 'react'
import PropTypes from 'prop-types'

const greets = {
  correct: [
    'That\'s right !',
    'Correct !',
    'Good !',
    'Well done !'
  ],
  incorrect: [
    'Nope',
    'Sorry :(',
    'That\'s wrong !',
    'Where did you learn how to count ?',
    'Better take your time before answering rubbish...'
  ]
}

export default class Result extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      greet: undefined
    }
  }

  componentDidMount () {
    const correct = this.props.guess === this.props.count && this.props.guess
    const a = correct ? greets.correct : greets.incorrect
    const greet = a[Math.round(Math.random() * (a.length - 1))]
    this.setState({ greet })
  }
  render () {
    const { guess, count, time, next, done, showNext } = this.props
    const correct = guess === count && guess && count
    return (
      <section>
        <h3>{ this.state.greet }</h3>
        { correct &&
          <p>You guessed <b className='success'>{guess}</b> in <b>{time.toFixed(3)}s</b>.</p>
        }
        { !correct &&
          <div>
            <p>Your guess: <b className='failure'>{guess}</b></p>
            <p>Correct answer: <b className='success'>{count}</b></p>
            <p>Your time: <b>{time.toFixed(3)}s</b></p>
          </div>
        }
        { showNext &&
          <button onClick={next}>Next</button>
        }
        <button onClick={done} className='secondary'>Finish</button>
      </section>
    )
  }
}

Result.propTypes = {
  guess: PropTypes.number,
  count: PropTypes.number,
  time: PropTypes.number,
  next: PropTypes.func,
  done: PropTypes.func,
  showNext: PropTypes.bool
}
