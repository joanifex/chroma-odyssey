import React from 'react'
import colorStyles from './colors.module.css'

const Badge = ({ frequencies }) => {
  const frequencySum = Object.values(frequencies).reduce(
    (sum, frequency) => sum + frequency,
    0
  )

  let currentWidth = 0

  return (
    <svg height="16" width="100">
      {Object.entries(frequencies).map(([color, value]) => {
        const width = (value / frequencySum) * 100
        const rect = (
          <rect
            className={colorStyles[color.toLowerCase()]}
            height="16"
            width={width}
            x={currentWidth}
          />
        )
        currentWidth = currentWidth + width
        return rect
      })}
    </svg>
  )
}

export default Badge
