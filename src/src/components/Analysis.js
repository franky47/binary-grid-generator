import React from 'react'
import { getMatrixDensity } from '../utility'
import countBy from 'lodash/countBy'
import './Analysis.css'

export default class Analysis extends React.PureComponent {
  render () {
    return (
      <section>
        <h3>Analysis</h3>
        <ul>
          { this.renderBarGraph() }
        </ul>
      </section>
    )
  }
  renderBarGraph () {
    const metrics = countBy(this.props.data, getMatrixDensity)
    return Object.keys(metrics).sort().map((key) => {
      const density = parseFloat(key)
      const count = metrics[key]
      return <li key={density}>{density}: {count}</li>
    })
  }
}
