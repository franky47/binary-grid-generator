import JSZip from 'jszip'
import $ from 'jquery'
import uniqueId from 'lodash/uniqueId'
import shortid from 'shortid'

export const setUserId = () => {
  const uid = getUserId()
  if (!uid || uid.length >= 15) {
    localStorage.setItem('bgg-uid', shortid.generate())
  }
}

export const getUserId = () => {
  return localStorage.getItem('bgg-uid')
}

export const generateRunId = () => shortid.generate()

export const stringifyMatrix = (matrix) => {
  return matrix.map((row) => row.join('')).join('|')
}

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

const renderFromSvg = (svg) => {
  return new Promise((resolve, reject) => {
    const serializer = new XMLSerializer()
    const svgstr = serializer.serializeToString(svg)
    const canvas = document.createElement('canvas')
    canvas.width = parseInt(svg.getAttribute('width').toString(), 10)
    canvas.height = parseInt(svg.getAttribute('height').toString(), 10)
    canvas.style = 'display: none'
    const ctx = canvas.getContext('2d')
    const DOMURL = window.URL || window.webkitURL || window
    const img = new global.Image()
    const blob = new global.Blob([svgstr], { type: 'image/svg+xml' })
    const url = DOMURL.createObjectURL(blob)
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      resolve({
        count: parseInt(svg.getAttribute('count').toString(), 10),
        side: parseInt(svg.getAttribute('side').toString(), 10),
        hex: svg.getAttribute('hex').toString(),
        url: canvas.toDataURL()
      })
      DOMURL.revokeObjectURL(url)
    }
    img.src = url
  })
}

export const renderMatrices = () => {
  return Promise.all($('svg.matrix').map((index, svg) => renderFromSvg(svg)))
}

export const generateSummary = (images) => {
  const summary = {
    files: []
  }

  for (const { count, url, hex } of images) {
    const filename = `${uniqueId()}-${hex}-${count}.png`
    summary.files.push({ count, url, hex, filename })
  }
  return summary
}

export const generateArchive = (summary) => {
  const zip = new JSZip()
  zip.file('summary.json', JSON.stringify(summary))
  const folder = zip.folder('images')
  for (const file of summary.files) {
    folder.file(file.filename, file.url.split(',')[1], { base64: true })
  }
  return zip.generateAsync({ type: 'blob' })
}

export const downloadFile = (blob, filename) => {
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  const url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

export const exportData = async () => {
  const renders = await renderMatrices()
  const summary = await generateSummary(renders)
  const archive = await generateArchive(summary)
  downloadFile(archive, `${(new Date()).toISOString()}.zip`)
}
