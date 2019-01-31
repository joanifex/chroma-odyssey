import React from 'react'
import { graphql } from 'gatsby'
import groupBy from 'lodash.groupby'
import Layout from '../components/layout'
import ColorWheel from '../components/color-wheel'
import SEO from '../components/seo'

class SegmentExplorer extends React.Component {
  state = { segment: null }

  handleUpdateSegment = segment => {
    this.setState({ segment })
  }

  render() {
    const { segment } = this.state
    return (
      <div>
        <ColorWheel handleFocusChange={this.handleUpdateSegment} />
        <ul>
          {segment &&
            this.props.segments[segment] &&
            this.props.segments[segment].map(reference => (
              <li key={reference.data.Color}>{reference.data.Color}</li>
            ))}
        </ul>
      </div>
    )
  }
}

export default ({ data }) => {
  const colors = data.allAirtable.edges
    .map(({ node }) => node)
    .filter(node => node.fields)
  const segments = groupBy(colors, 'fields.segment')
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <SegmentExplorer segments={segments} />
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
