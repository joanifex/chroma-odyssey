const findFrequenciesByPropertyValue = (edges, { property, value }) =>
  edges.reduce(
    (colors, { node: { data } }) =>
      data[property] && data[property].toLowerCase() === value
        ? {
            ...colors,
            [data.color]: colors.hasOwnProperty(data.color)
              ? colors[data.color] + 1
              : 1,
          }
        : colors,
    {}
  )
