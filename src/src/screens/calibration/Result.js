import React from 'react'
import PropTypes from 'prop-types'

const greets = {
  correct: [
    'C\'est juste'
  ],
  incorrect: [
    'C\'est faux'
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
    const correct = this.props.guess === this.props.count
    const a = correct ? greets.correct : greets.incorrect
    const greet = a[Math.round(Math.random() * (a.length - 1))]
    this.setState({ greet })
  }
  render () {
    const { guess, count, time, next, done, showNext } = this.props
    const correct = guess === count
    return (
      <section>
        <h3>{ this.state.greet }</h3>
        { correct &&
          <div>
            <p>Vous avez mis : <b className='success'>{guess}</b></p>
            <p>Temps : <b>{time.toFixed(2)}s</b>.</p>
          </div>
        }
        { !correct &&
          <div>
            <p>Vous avez mis : <b className='failure'>{guess}</b></p>
            <p>Réponse juste : <b className='success'>{count}</b></p>
            <p>Temps : <b>{time.toFixed(2)}s</b></p>
          </div>
        }
        { showNext &&
          <button onClick={next}>Suivant</button>
        }
        <button onClick={done} className='secondary'>Finir</button>
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
