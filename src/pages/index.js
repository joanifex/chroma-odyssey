import React from 'react'
import { graphql } from 'gatsby'
import * as d3 from 'd3'
import Layout from '../components/layout'
import SEO from '../components/seo'

const findFrequenciesByPropertyValue = (edges, { property, value }) =>
  edges.reduce(
    (colors, { node: { data } }) =>
      data[property] && data[property].toLowerCase() === value
        ? {
            ...colors,
            [data.color]: colors.hasOwnProperty(data.color)
              ? colors[data.color] + 1
              : 1,
          }
        : colors,
    {}
  )

export default ({ data }) => {
  const { edges } = data.allAirtable
  const characters = Array.from(
    new Set(
      edges
        .filter(({ node: { data } }) => data.character)
        .map(({ node: { data } }) => data.character.toLowerCase())
    )
  ).sort((a, b) => a.localeCompare(b))
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <h2>Characters</h2>
      <div>
        {characters.map(character => (
          <div key={character}>
            <div>{JSON.stringify(character)}</div>
            <div>
              {JSON.stringify(
                findFrequenciesByPropertyValue(edges, {
                  property: 'character',
                  value: character,
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allAirtable(filter: { table: { eq: "Main" } }) {
      edges {
        node {
          data {
            book
            character
            color
            location
            theme
          }
        }
      }
    }
  }
`
