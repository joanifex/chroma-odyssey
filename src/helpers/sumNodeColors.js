export default nodes =>
  Object.entries(
    nodes.reduce(
      (
        colors,
        {
          node: {
            data: { color },
          },
        }
      ) => ({
        ...colors,
        [color]: colors.hasOwnProperty(color) ? colors[color] + 1 : 1,
      }),
      {}
    )
  )
    .map(([key, value]) => ({ color: key, value }))
    .sort((a, b) => a.value > b.value)
