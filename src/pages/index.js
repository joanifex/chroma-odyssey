import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Pie from '../components/pie'
import SEO from '../components/seo'

const CHARACTERS = ['Odysseus']

const colorsByCharacter = edges => {
  const data = {}

  for (const {
    node: {
      data: { character, color },
    },
  } of edges) {
    if (!(character in data)) {
      data[character] = {}
    }
    if (!(color in data[character])) {
      data[character][color] = 1
    } else {
      data[character][color] = data[character][color] + 1
    }
  }
  return data
}

export default ({ data }) => {
  const colorData = colorsByCharacter(data.allAirtable.edges)

  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <h2>Characters</h2>
      {CHARACTERS.map(character => (
        <div key={character}>
          <h3>{character}</h3>
          <Pie
            width={500}
            height={500}
            margin={0}
            data={Object.entries(colorData[character]).map(
              ([color, count]) => ({ color, count })
            )}
          />
        </div>
      ))}
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
