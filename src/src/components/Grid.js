import React from 'react'
import Matrix from './Matrix'
import './Grid.css'
import { getCount } from '../utility'

export default class Grid extends React.PureComponent {
  render () {
    console.log(this.props.data)
    return (
      <section className='grid-container'>
        {
          this.props.data.map((matrix, index) => (
            <div className='grid-item'>
              <Matrix className='grid-item' data={matrix} key={index} />
              <figcaption>{getCount(matrix)}</figcaption>
            </div>
          ))
        }
      </section>
    )
  }
}
