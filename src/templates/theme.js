import React from 'react'
import { graphql } from 'gatsby'
import sumNodeColors from '../helpers/sumNodeColors'

import ColorScale from '../components/colorScale'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data, pageContext }) => {
  const frequencies = sumNodeColors(data.allChromaCsv.edges)
  return (
    <Layout>
      <SEO title="" />
      <h1>{pageContext.theme}</h1>
      <ColorScale frequencies={frequencies} />
    </Layout>
  )
}

export const query = graphql`
  query($value: String!) {
    allChromaCsv(filter: { theme: { eq: $value } }) {
      edges {
        node {
          color
        }
      }
    }
  }
`
