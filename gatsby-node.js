const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allAirtable(filter: { table: { eq: "Main" } }) {
        edges {
          node {
            data {
              book
              character
              location
              theme
            }
          }
        }
      }
    }
  `).then(result => {
    const nodes = result.data.allAirtable.edges.map(edge => edge.node.data)
    const nodeValueSets = ['book', 'character', 'location', 'theme'].reduce(
      (sets, key) => ({
        ...sets,
        [key]: Array.from(
          new Set(nodes.map(node => node[key]).filter(value => !!value))
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
