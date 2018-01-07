const pd = require('probability-distributions')
const uniq = require('lodash/uniq')
const take = require('lodash/take')

const generateMatrix = (side, density) => {
  return new Promise((resolve) => {
    const size = side * side
    const numOnes = Math.floor(size * density)

    // Generate blank matrix
    const matrix = Array(side).fill([]).map(() => Array(side).fill(0))

    if (numOnes === 0) {
      return resolve(matrix)
    } else if (numOnes === size) {
      return resolve(Array(side).fill([]).map(() => Array(side).fill(1)))
    }

    // To know where to insert the ones, consider a 3 x 3 matrix,
    // and assign a coordinate number to each cell:
    // [0, 1, 2]
    // [3, 4, 5]
    // [6, 7, 8]
    // The deal is to generate an array of N unique random values
    // with a uniform progression between 0 and side^2 - 1

    // Hack: to avoid array reduction while deduping,
    // generate a larger one initially, dedupe and keep a subset.
    take(uniq(pd.rint(numOnes * 4, 0, size - 1)), numOnes)
      .forEach(c => {
        const x = Math.floor(c % side)
        const y = Math.floor(c / side)
        matrix[y][x] = 1
      })
    resolve(matrix)
  })
}

const stringifyMatrix = (matrix) => {
  return matrix.map((row) => row.join('')).join('|')
}

const getMatrixDensity = (matrix) => {
  const length = matrix.length * matrix.length
  const reducer = (acc, val) => acc + val
  return matrix.reduce((acc, row) => acc + row.reduce(reducer), 0) / length
}

/**
* @param context {WebtaskContext}
*
* Query string arguments:
* @arg size {Integer} - The number of matrices to generate.
* @arg side {Integer} - The size of the square (side x side).
* @arg mindp {Float} - Minimum matrix density
* @arg maxdp {Float} - Maximum matrix density
* @arg distribution {uniform | normal} - Density probability distribution
*/
module.exports = function (context, cb) {
  const size = parseInt(context.query.size) || 100
  const side = parseInt(context.query.side) || 5
  const mindp = parseFloat(context.query.mindp || '0.3')
  const maxdp = parseFloat(context.query.maxdp || '0.7')
  const distribution = context.query.distribution || 'uniform'

  console.log(`Request: ${size} ${side}x${side} matrices of ${distribution} density [${mindp};${maxdp}]`)

  var densities = []
  switch (distribution) {
    case 'uniform':
      densities = pd.runif(size, mindp, maxdp)
      break
    case 'normal':
      densities = pd.rnorm(size, 0.5, 0.25 * (maxdp - mindp))
        .map(d => Math.max(Math.min(d, maxdp), mindp))
      break
  }

  // Generate the matrices
  return Promise.all(densities.map((d) => generateMatrix(side, d)))
    .then((matrices) => {
      cb(null, {
        matrices: matrices.map(stringifyMatrix),
        densities: matrices.map(getMatrixDensity)
      })
    })
}
