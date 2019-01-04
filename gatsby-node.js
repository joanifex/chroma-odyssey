const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allChromaCsv {
        edges {
          node {
            character
          }
        }
      }
    }
  `).then(result => {
    const characters = Array.from(
      new Set(
        result.data.allChromaCsv.edges
          .map(({ node }) => node.character)
          .filter(character => character.length >= 1)
      )
    )
    characters.forEach(character => {
      createPage({
        path: `characters/${character.toLowerCase()}`,
        component: path.resolve(`./src/templates/character.js`),
        context: { character },
      })
    })
  })
}
