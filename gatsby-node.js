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
    const characters = result.data.allChromaCsv.edges
      .reduce(
        (characters, { node }) =>
          characters.includes(node.character)
            ? characters
            : [...characters, node.character],
        []
      )
      .filter(character => character.length >= 1)
    characters.forEach(character => {
      createPage({
        path: `characters/${character.toLowerCase()}`,
        component: path.resolve(`./src/templates/character.js`),
        context: { character },
      })
    })
  })
}
