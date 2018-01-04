const pd = require('probability-distributions')
const uniq = require('lodash/uniq')
const take = require('lodash/take')

const generateMatrix = (side, density) => {
  return new Promise((resolve) => {
    const size = side * side
    const numOnes = Math.floor(size * density)
    const matrix = Array(side).fill([]).map(() => Array(side).fill(0))
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

/**
* @param context {WebtaskContext}
*
* Query string arguments:
* @query num_matrices {Integer} - The number of matrices to generate.
* @query side {Integer} - The size of the square (side x side).
*/
module.exports = function (context, cb) {
  const numMatrices = parseInt(context.query.num_matrices) || 100
  const side = parseInt(context.query.side) || 5

  // Get N numbers between 0.0 and 1.0 with uniform distribution,
  // between 30% and 70%:
  const densities = pd.runif(numMatrices, 0.3, 0.7)

  // Generate the matrices
  return Promise.all(densities.map((d) => generateMatrix(side, d)))
    .then((matrices) => {
      cb(null, {
        matrices: matrices.map(m => stringifyMatrix(m)),
        densities
      })
    })
}
