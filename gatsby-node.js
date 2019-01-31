const path = require('path')
const d3 = require('d3')
const chroma = require('chroma-js')

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

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.table === 'Colors' && node.data.hexcode) {
    const colorCount = 8
    const colors = d3
      .range(colorCount)
      .map((d, i) => d3.interpolateRainbow(i / colorCount))
    const distances = colors.map((color, i) => ({
      distance: chroma.distance(node.data.hexcode, color),
      segment: i + 1,
    }))
    const closest = d3.min(distances, d => d.distance)
    const { segment } = distances.find(
      distance => distance.distance === closest
    )
    createNodeField({ node, name: 'segment', value: segment })
  }
}
