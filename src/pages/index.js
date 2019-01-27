import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ColorWheel from '../components/color-wheel'
import SEO from '../components/seo'

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <ColorWheel />
    </Layout>
  )
}

export const query = graphql`
  query {
    allAirtable(filter: { table: { eq: "Colors" } }) {
      edges {
        node {
          data {
            Color
            Gradient
          }
        }
      }
    }
  }
`
