import React from 'react'
import { generateRunId } from '../../utility'

import './Intro.css'

export default class Intro extends React.PureComponent {
  render () {
    const { loading } = this.props
    return (
      <section className='intro'>
        <h1>Matrices binaires <span className='secondary separator'>|</span> Calibration</h1>
        <p>Compter le nombre de "1" !</p>
        { loading &&
          <p>Chargement</p>
        }
        { !loading &&
          <button onClick={this.start}>Commencer</button>
        }
      </section>
    )
  }

  start = () => {
    this.props.updateRunId(generateRunId())
    this.props.next()
  }
}
