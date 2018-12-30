import React from 'react'
import { graphql } from 'gatsby'

import { AxisBottom, AxisLeft } from '@vx/axis'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import { scaleLinear, scaleBand } from '@vx/scale'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {
  const frequencies = Object.entries(
    data.allChromaCsv.edges.reduce((colors, { node: { color } }) => {
      return {
        ...colors,
        [color]: colors.hasOwnProperty(color) ? colors[color] + 1 : 1,
      }
    }, {})
  )
    .map(([key, value]) => ({ color: key, value }))
    .sort((a, b) => a.value > b.value)

  const width = 750
  const height = 500
  const margin = { top: 50, bottom: 50, left: 50, right: 50 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const x = d => d.color
  const y = d => d.value

  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: frequencies.map(x),
    padding: 0.4,
  })
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...frequencies.map(y))],
    nice: true,
  })

  const compose = (scale, accessor) => frequencies =>
    scale(accessor(frequencies))
  const xPoint = compose(
    xScale,
    x
  )
  const yPoint = compose(
    yScale,
    y
  )

  return (
    <Layout>
      <SEO title="" />
      <h1>Odysseus</h1>
      <svg width={width} height={height}>
        <Group>
          <AxisBottom
            top={yMax + margin.top}
            left={margin.left}
            scale={xScale}
            hideAxisLine
            hideTicks
          />
          <AxisLeft
            scale={yScale}
            top={margin.top}
            left={margin.left}
            numTicks={5}
            hideAxisLine
            hideTicks
            hideZero
          />
          {frequencies.map((d, i) => {
            const barHeight = yMax - yPoint(d)
            return (
              <Group left={margin.left} top={margin.top} key={`bar-${i}`}>
                <Bar
                  x={xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill="#fc2e1c"
                  stroke="black"
                />
              </Group>
            )
          })}
        </Group>
      </svg>
    </Layout>
  )
}

export const query = graphql`
  query {
    allChromaCsv(filter: { character: { eq: "Odysseus" } }) {
      edges {
        node {
          color
        }
      }
    }
  }
`
