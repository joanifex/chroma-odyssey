import React from 'react'
import { Link, graphql } from 'gatsby'
import Badge from '../components/badge'
import Layout from '../components/layout'
import SEO from '../components/seo'

const findFrequenciesByPropertyValue = (edges, { property, value }) => {
  return edges.reduce(
    (colors, { node }) =>
      node[property].toLowerCase() === value
        ? {
            ...colors,
            [node.color]: colors.hasOwnProperty(node.color)
              ? colors[node.color] + 1
              : 1,
          }
        : colors,
    {}
  )
}

export default ({ data }) => {
  const { edges } = data.allChromaCsv
  const characters = Array.from(
    new Set(edges.map(({ node }) => node.character.toLowerCase()))
  )
  const locations = Array.from(
    new Set(edges.map(({ node }) => node.location.toLowerCase()))
  )
  const themes = Array.from(
    new Set(edges.map(({ node }) => node.theme.toLowerCase()))
  )
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <h1>Home</h1>
      <h2>Characters</h2>
      {characters.map(character => (
        <div key={`${character}-link`}>
          <Link to={`characters/${character}`}>{character}</Link>
          <Badge
            frequencies={findFrequenciesByPropertyValue(edges, {
              property: 'character',
              value: character,
            })}
          />
        </div>
      ))}
      <h2>Locations</h2>
      {locations.map(location => (
        <div key={`${location}-link`}>
          <Link to={`locations/${location}`}>{location}</Link>
          <Badge
            frequencies={findFrequenciesByPropertyValue(edges, {
              property: 'location',
              value: location,
            })}
          />
        </div>
      ))}
      <h2>Themes</h2>
      {themes.map(theme => (
        <div key={`${theme}-link`}>
          <Link to={`themes/${theme}`}>{theme}</Link>
          <Badge
            frequencies={findFrequenciesByPropertyValue(edges, {
              property: 'theme',
              value: theme,
            })}
          />
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allChromaCsv {
      edges {
        node {
          character
          color
          location
          theme
        }
      }
    }
  }
`
