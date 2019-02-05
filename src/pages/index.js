import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    allAirtable(filter: { table: { eq: "Colors" } }) {
      edges {
        node {
          data {
            color
            hexcode
          }
          fields {
            segment
          }
        }
      }
    }
  }
`
