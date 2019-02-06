import React from 'react'
import { graphql } from 'gatsby'
import * as d3 from 'd3'
import Layout from '../components/layout'
import SEO from '../components/seo'

const rootColors = {
  black: '#222222',
  blue: 'blue',
  bronze: 'bronze',
  gold: 'gold',
  green: 'green',
  grey: 'grey',
  orange: 'orange',
  purple: 'purple',
  red: 'red',
  silver: 'silver',
  white: 'white',
  yellow: 'yellow',
}

const buildHierarchy = nodes => {
  const children = nodes.map(node => {
    const [parent] = node.color.split('-')
    return {
      ...node,
      size: 1,
      parent,
    }
  })

  const parents = Array.from(new Set(children.map(child => child.parent))).map(
    parent => ({ color: parent, parent: 'root' })
  )
  const root = {
    color: 'root',
    parent: '',
  }
  return d3
    .stratify()
    .id(d => d.color)
    .parentId(d => d.parent)([...children, ...parents, root])
}

const createSunburst = data => {
  const width = 750
  const height = 600
  const radius = Math.min(width, height) / 2

  const json = buildHierarchy(data)
  const root = d3
    .hierarchy(json)
    .sum(d => d.data.size)
    .sort((a, b) => b.value - a.value)

  const vis = d3
    .select('#chart')
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height)
    .append('svg:g')
    .attr('id', 'container')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  vis
    .append('svg:circle')
    .attr('r', radius)
    .style('opacity', 0)

  const partition = d3.partition().size([2 * Math.PI, radius * radius])

  const arc = d3
    .arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => Math.sqrt(d.y0))
    .outerRadius(d => Math.sqrt(d.y1))

  const nodes = partition(root).descendants()
  vis
    .data([json])
    .selectAll('path')
    .data(nodes)
    .enter()
    .append('svg:path')
    .attr('display', function(d) {
      return d.depth ? null : 'none'
    })
    .attr('d', arc)
    .attr('fill-rule', 'evenodd')
    .style('fill', function(d) {
      return d.data.data.hexcode
        ? d.data.data.hexcode
        : rootColors[d.data.data.color]
        ? rootColors[d.data.data.color]
        : 'black'
    })
  // .on('mouseover', mouseover)
}

export default class Home extends React.Component {
  componentDidMount() {
    const nodes = this.props.data.allAirtable.edges.map(
      ({ node: { data } }) => data
    )
    createSunburst(nodes)
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <div id="chart" />
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
        }
      }
    }
  }
`
