import React from 'react'

import { Group } from '@vx/group'
import { ScaleSVG } from '@vx/responsive'
import { Pie } from '@vx/shape'

import styles from './colors.module.css'

const black = '#000000'

const PieChart = ({ frequencies }) => {
  const height = 500
  const width = 500

  const radius = Math.min(width, height) / 2

  const centerY = height / 2
  const centerX = width / 2

  return (
    <ScaleSVG width={width} height={height}>
      <Group top={centerY} left={centerX}>
        <Pie
          data={frequencies}
          pieValue={d => d.value}
          outerRadius={radius - 80}
          innerRadius={radius - 120}
          cornerRadius={3}
          padAngle={0}
        >
          {pie => {
            return pie.arcs.map((arc, i) => {
              const [centroidX, centroidY] = pie.path.centroid(arc)
              const { startAngle, endAngle } = arc
              const hasSpaceForLabel = endAngle - startAngle >= 0.1
              return (
                <g key={`browser-${arc.data.color}-${i}`}>
                  <path
                    className={styles[arc.data.color.toLowerCase()]}
                    d={pie.path(arc)}
                    fillOpacity={0.5}
                  />
                  {hasSpaceForLabel && (
                    <text
                      fill={black}
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fontSize={9}
                      textAnchor="middle"
                    >
                      {arc.data.color}
                    </text>
                  )}
                </g>
              )
            })
          }}
        </Pie>
      </Group>
    </ScaleSVG>
  )
}

export default PieChart
