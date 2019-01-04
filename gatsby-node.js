const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allChromaCsv {
        edges {
          node {
            character
            location
            theme
          }
        }
      }
    }
  `).then(result => {
    const nodes = result.data.allChromaCsv.edges.map(edge => edge.node)
    const nodeValueSets = ['character', 'location', 'theme'].reduce(
      (sets, key) => ({
        ...sets,
        [key]: Array.from(
          new Set(
            nodes
              .map(node => node[key])
              .filter(value => value && value.length >= 1)
          )
        ),
      }),
      {}
    )
    Object.entries(nodeValueSets).forEach(([key, values]) => {
      values.forEach(value => {
        createPage({
          path: `${key}s/${value.toLowerCase()}`,
          component: path.resolve(`./src/templates/${key}.js`),
          context: { value },
        })
      })
    })
  })
}
