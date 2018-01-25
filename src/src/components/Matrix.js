import React from 'react'
import one from './one.svg'
import zero from './zero.svg'

const matrixSize = 30

const styles = {
  container: (side) => ({
    display: 'grid',
    width: `${side * matrixSize + side - 1}px`,
    height: `${side * matrixSize + side - 1}px`,
    gridTemplateRows: `repeat(${side}, ${matrixSize}px)`,
    gridTemplateColumns: `repeat(${side}, ${matrixSize}px)`,
    border: 'solid 2px black',
    backgroundColor: 'black',
    gridGap: '0px 0px'
  }),
  cell: {
    fontFamily: 'Arial',
    fontSize: `${matrixSize * 0.5}px`,
    backgroundColor: 'white',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: `${matrixSize}px`
  }
}

export default class Matrix extends React.PureComponent {
  render () {
    const side = this.props.data.length
    const cells = this.props.data.reduce((acc, row) => acc.concat(row))
    return (
      <div style={styles.container(side)} className='matrix'>
        {
          cells.map((value, index) =>
            <div style={styles.cell} key={index}>
              <img src={value ? one : zero} alt={value ? 'one' : 'zero'} />
            </div>
          )
        }
      </div>
    )
  }
}
