import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => (
  <Layout>
    <SEO title="" />
    <h1>Odysseus</h1>
    <Link to="/">Home</Link>
    <div>{JSON.stringify(data)}</div>
  </Layout>
)

export const query = graphql`
  query {
    allChromaCsv(filter: { character: { eq: "Odysseus" } }) {
      edges {
        node {
          color
          theme
          character
        }
      }
    }
  }
`
