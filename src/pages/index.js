import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {
  const { edges } = data.allAirtable
  // const characters = Array.from(
  //   new Set(
  //     edges
  //       .filter(({ node: { data } }) => data.character)
  //       .map(({ node: { data } }) => data.character.toLowerCase())
  //   )
  // ).sort((a, b) => a.localeCompare(b))
  //
  const colorsByCharacter = {}
  for (const {
    node: {
      data: { character, color },
    },
  } of edges) {
    if (!(character in colorsByCharacter)) {
      colorsByCharacter[character] = {}
    }
    if (!(color in colorsByCharacter[character])) {
      colorsByCharacter[character][color] = 1
    } else {
      colorsByCharacter[character][color] =
        colorsByCharacter[character][color] + 1
    }
  }

  console.log(colorsByCharacter)

  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <h2>Characters</h2>
      <div>
        <h3>Odysseus</h3>
        <div>{JSON.stringify(colorsByCharacter.Odysseus)}</div>
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
            character
            color
          }
        }
      }
    }
  }
`
