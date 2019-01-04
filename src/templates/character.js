import React from 'react'
import { graphql } from 'gatsby'

import ColorScale from '../components/colorScale'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data, pageContext }) => {
  const frequencies = Object.entries(
    data.allChromaCsv.edges.reduce(
      (colors, { node: { color } }) => ({
        ...colors,
        [color]: colors.hasOwnProperty(color) ? colors[color] + 1 : 1,
      }),
      {}
    )
  )
    .map(([key, value]) => ({ color: key, value }))
    .sort((a, b) => a.value > b.value)

  return (
    <Layout>
      <SEO title="" />
      <h1>{pageContext.character}</h1>
      <ColorScale frequencies={frequencies} />
    </Layout>
  )
}

export const query = graphql`
  query($character: String!) {
    allChromaCsv(filter: { character: { eq: $character } }) {
      edges {
        node {
          color
        }
      }
    }
  }
`
