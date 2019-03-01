import React from 'react'
import { Pie } from '@vx/shape'
import { Group } from '@vx/group'

export default ({ width, height, margin, data }) => {
  const radius = Math.min(width, height) / 2
  const centerY = height / 2
  const centerX = width / 2

  return (
    <svg width={width} height={height}>
      <Group top={centerY} left={centerX}>
        <Pie
          data={data}
          pieValue={d => 1}
          outerRadius={radius - 80}
          innerRadius={radius - 120}
          cornerRadius={3}
          padAngle={0}
        >
          {pie => {
            return pie.arcs.map((arc, i) => {
              const opacity = 1 / (i + 2)
              const [centroidX, centroidY] = pie.path.centroid(arc)
              const { startAngle, endAngle } = arc
              const hasSpaceForLabel = endAngle - startAngle >= 0.1
              return (
                <g key={`browser-${arc.data.color}-${i}`}>
                  <path
                    d={pie.path(arc)}
                    fill="#000000"
                    fillOpacity={opacity}
                  />
                  {hasSpaceForLabel && (
                    <text
                      fill="#FFFFFF"
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
