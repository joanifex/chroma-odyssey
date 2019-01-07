import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

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
        </div>
      ))}
      <h2>Locations</h2>
      {locations.map(location => (
        <div key={`${location}-link`}>
          <Link to={`locations/${location}`}>{location}</Link>
        </div>
      ))}
      <h2>Themes</h2>
      {themes.map(theme => (
        <div key={`${theme}-link`}>
          <Link to={`themes/${theme}`}>{theme}</Link>
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
          location
          theme
        }
      }
    }
  }
`
