import { minBy, maxBy } from 'lodash'

export const computeStats = (results) => {
  return {
    bestTime: minBy(results, r => r.time).time,
    worstTime: maxBy(results, r => r.time).time,
    averageTime: results.map(r => r.time).reduce((a, t) => a + t) / results.length,
    numCompleted: results.length,
    numTotal: results[0].completion.of,
    numCorrect: results.filter(r => r.count === r.guess).length
  }
}
