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
      data: { character, color, color_reference },
    },
  } of edges) {
    if (color_reference) {
      const { hexcode } = color_reference[0].data
      if (!(character in data)) {
        data[character] = []
      }
      if (!data[character].find(entry => entry.color === color)) {
        data[character].push({ color, hexcode })
      }
    }
  }
  return data
}

export default ({ data }) => {
  const colorData = colorsByCharacter(data.allAirtable.edges)

  console.log(colorData)
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
            data={colorData[character]}
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
            color_reference {
              data {
                hexcode
              }
            }
          }
        }
      }
    }
  }
`
