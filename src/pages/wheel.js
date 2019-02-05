import React from 'react'
import { graphql } from 'gatsby'
import groupBy from 'lodash.groupby'
import ColorReference from '../components/color-reference'
import ColorWheel from '../components/color-wheel'
import Layout from '../components/layout'
import SEO from '../components/seo'
import styles from './wheel.module.css'

export default class Wheel extends React.Component {
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
                <ColorReference
                  key={reference.data.color}
                  reference={reference}
                />
              ))}
            {segment &&
              segments[segment] &&
              segments[segment].map(reference => (
                <ColorReference
                  key={reference.data.color}
                  reference={reference}
                />
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
