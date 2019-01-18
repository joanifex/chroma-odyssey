import React from 'react'
import { ParentSize } from '@vx/responsive'
import colorStyles from './colors.module.css'

const Badge = ({ frequencies }) => {
  const frequencySum = Object.values(frequencies).reduce(
    (sum, frequency) => sum + frequency,
    0
  )
  return (
    <ParentSize>
      {({ width }) => {
        let nextRectWidth = 0
        return (
          <svg height="16" width={width}>
            {Object.entries(frequencies).map(([color, value]) => {
              const frequencyWidth = (value / frequencySum) * width
              const rect = (
                <rect
                  className={colorStyles[color.toLowerCase()]}
                  height="16"
                  key={color}
                  width={frequencyWidth}
                  x={nextRectWidth}
                />
              )
              nextRectWidth = nextRectWidth + frequencyWidth
              return rect
            })}
          </svg>
        )
      }}
    </ParentSize>
  )
}

export default Badge
