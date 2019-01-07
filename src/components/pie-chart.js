import React from 'react'

import { Pie } from '@vx/shape'
import { Group } from '@vx/group'

import styles from './colors.module.css'

const black = '#000000'

const PieChart = ({ frequencies }) => {
  const width = 750
  const height = 500
  const margin = { top: 50, bottom: 50, left: 50, right: 50 }

  const radius = Math.min(width, height) / 2
  const centerY = height / 2
  const centerX = width / 2

  return (
    <svg width={width} height={height}>
      <Group top={centerY - margin.top} left={centerX}>
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
    </svg>
  )
}

export default PieChart
