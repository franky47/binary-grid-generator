import React from 'react'
import { getCount } from '../utility'
import './Matrix.css'

const cellSizePx = 30

// Note: does not handle more than 53 bits (flushes to zero)
const hexify = (data) => parseInt(data.map((row) => row.join('')).join('').slice(0, 53), 2).toString(16)

export default class Matrix extends React.PureComponent {
  render () {
    const count = getCount(this.props.data)
    const border = 2
    const line = 1
    const side = this.props.data.length
    const width = side * cellSizePx + 2 * border + (side - 1) * line
    return (
      <svg
        className='matrix'
        count={count}
        side={side}
        hex={hexify(this.props.data)}
        width={width}
        height={width}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={width}
          fill='#000'
        />
        {
          this.props.data.map((row, y) => row.map((cell, x) => {
            return (
              <g key={`${x}-${y}`}>
                <rect
                  x={border + x * (cellSizePx + line)}
                  y={border + y * (cellSizePx + line)}
                  width={cellSizePx}
                  height={cellSizePx}
                  fill='#fff'
                />
                <text
                  textAnchor='middle'
                  x={border + (x + 0.5) * (cellSizePx + line)}
                  y={border + (y + 0.7) * (cellSizePx + line)}
                  fontFamily='Arial'
                  fontSize='16'
                  fill='#000'
                >
                  {cell}
                </text>
              </g>
            )
          }))
        }
      </svg>
    )
  }
}
