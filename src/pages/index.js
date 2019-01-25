import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allAirtable {
      edges {
        node {
          data {
            color
          }
        }
      }
    }
  }
`
