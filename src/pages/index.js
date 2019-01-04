import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {
  const { edges } = data.allChromaCsv
  const characters = Array.from(
    new Set(edges.map(({ node }) => node.character.toLowerCase()))
  )
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <h1>Home</h1>
      <h2>Characters</h2>
      {characters.map(character => (
        <div id={`${character}-link`}>
          <Link to={`characters/${character}`}>{character}</Link>
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
        }
      }
    }
  }
`
