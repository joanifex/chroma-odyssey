import React from 'react'

const Bar = ({ frequencies }) => {
  const frequencySum = Object.values(frequencies).reduce(
    (sum, frequency) => sum + frequency.value,
    0
  )
  let nextOffset = 0
  const offsetFrequencies = frequencies.map((frequency, index) => {
    const offsetFrequency = {
      ...frequency,
      offset: index === 0 ? `0%` : `${nextOffset}%`,
    }
    nextOffset = nextOffset + (frequency.value / frequencySum) * 100
    return offsetFrequency
  })
  return (
    <svg height="100" width="1500">
      <defs>
        <linearGradient id="barGradient">
          {offsetFrequencies.map(({ color, offset, value }) => (
            <stop
              className={color.toLowerCase()}
              key={color}
              offset={offset}
              stopOpacity="0.70"
            />
          ))}
        </linearGradient>
      </defs>
      <rect height="100" width="500" fill="url(#barGradient)" />
    </svg>
  )
}

export default Bar
