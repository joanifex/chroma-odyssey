import React from 'react'
import { arc, color, interpolateRainbow, range, select } from 'd3'
import styles from './color-wheel.module.css'

const SIZE = 500
const SIZE_INNER = 100
const BANDS = 2
const BAND_WIDTH = (SIZE - SIZE_INNER) / BANDS
const MIN_OPACITY = 0.1
const OPACITY_STEP = (1 - MIN_OPACITY) / BANDS
const COUNT = 8
const COLORS = range(COUNT).map((d, i) => interpolateRainbow(i / COUNT))
const SVG_ID = 'color-wheel'

const createColorWheel = handleFocusChange => {
  const svg = select(`#${SVG_ID}`)
    .append('svg')
    .attr('width', SIZE)
    .attr('height', SIZE)
    .append('g')
    .attr('transform', `translate(${SIZE / 2},${SIZE / 2})`)

  range(1, BANDS).forEach(k => {
    const colorArc = arc()
      .outerRadius((SIZE - k * BAND_WIDTH) / 2)
      .innerRadius((SIZE - (k + 1) * BAND_WIDTH) / 2)
      .startAngle(0)
      .endAngle((2 * Math.PI) / COUNT)
    svg
      .append('g')
      .attr('class', 'band')
      .selectAll('path')
      .data(COLORS)
      .enter()
      .append('path')
      .attr('tabindex', 0)
      .attr('class', `hi ${styles.path}`)
      .attr('fill', d => {
        const c = color(d)
        c.opacity = 1 - OPACITY_STEP * k
        return `${c}`
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('transform', (d, i) => `rotate(${i * (360 / COUNT)})`)
      .attr('d', colorArc())
      .on('mouseover', (d, i) => {
        handleFocusChange(i)
      })
      .on('focus', (d, i) => {
        handleFocusChange(i)
      })
  })
}

class ColorWheel extends React.Component {
  state = {
    focused: null,
  }

  componentDidMount() {
    createColorWheel(this.handleFocusChange)
  }

  handleFocusChange = focused => {
    this.setState({ focused })
  }

  render() {
    return <div id={SVG_ID} />
  }
}

export default ColorWheel
