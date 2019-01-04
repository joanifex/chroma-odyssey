const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allChromaCsv {
        edges {
          node {
            character
            theme
          }
        }
      }
    }
  `).then(result => {
    const nodes = result.data.allChromaCsv.edges.map(edge => edge.node)
    const nodeValueSets = ['character', 'theme'].reduce(
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
      if (key === 'character') {
        values.forEach(value => {
          createPage({
            path: `characters/${value.toLowerCase()}`,
            component: path.resolve(`./src/templates/character.js`),
            context: { character: value },
          })
        })
      }
    })
  })
}
