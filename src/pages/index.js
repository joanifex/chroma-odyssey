import React from 'react'
import { graphql } from 'gatsby'
import groupBy from 'lodash.groupby'
import Layout from '../components/layout'
import ColorWheel from '../components/color-wheel'
import SEO from '../components/seo'
import styles from './index.module.css'

export default class Home extends React.Component {
  state = { segment: null }

  handleUpdateSegment = segment => {
    this.setState({ segment })
  }

  render() {
    const colors = this.props.data.allAirtable.edges
      .map(({ node }) => node)
      .filter(node => node.fields)
    const segments = groupBy(colors, 'fields.segment')
    const { segment } = this.state
    return (
      <Layout>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <div className={styles.segmentExplorer}>
          <ColorWheel handleFocusChange={this.handleUpdateSegment} />
          <ul>
            {!segment &&
              colors.map(reference => (
                <li key={reference.data.Color}>{reference.data.Color}</li>
              ))}
            {segment &&
              segments[segment] &&
              segments[segment].map(reference => (
                <li key={reference.data.Color}>{reference.data.Color}</li>
              ))}
          </ul>
        </div>
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
