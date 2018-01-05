import React from 'react'
import Matrix from './MatrixSvg'
import './Grid.css'
import { getCount } from '../utility'

export default class Grid extends React.PureComponent {
  render () {
    return (
      <section className='grid-container'>
        {
          this.props.data.map((matrix, index) => (
            <div className='grid-item' key={index}>
              <Matrix className='grid-item' data={matrix} />
              <figcaption>{getCount(matrix)}</figcaption>
            </div>
          ))
        }
      </section>
    )
  }
}
