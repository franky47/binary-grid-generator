export const decodeMatrix = (str) => {
  return str.split('|').map((row) => row.split('').map((v) => parseInt(v, 2)))
}

export const getCount = (matrix) => {
  const reducer = (acc, val) => acc + val
  return matrix.reduce((acc, row) => acc + row.reduce(reducer), 0)
}

export const getMatrixDensity = (matrix) => {
  const length = matrix.length * matrix.length
  const reducer = (acc, val) => acc + val
  return matrix.reduce((acc, row) => acc + row.reduce(reducer), 0) / length
}
