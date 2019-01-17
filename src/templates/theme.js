import React from 'react'
import { graphql } from 'gatsby'
import sumNodeColors from '../helpers/sumNodeColors'

import Layout from '../components/layout'
import PieChart from '../components/pie-chart'
import SEO from '../components/seo'

export default ({ data, pageContext }) => {
  const frequencies = sumNodeColors(data.allAirtable.edges)
  return (
    <Layout>
      <SEO title="" />
      <h1>{pageContext.value}</h1>
      <PieChart frequencies={frequencies} />
    </Layout>
  )
}

export const query = graphql`
  query($value: String!) {
    allAirtable(filter: { data: { theme: { eq: $value } } }) {
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
