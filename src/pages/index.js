import React from 'react'
import { Link, graphql } from 'gatsby'
import Badge from '../components/badge'
import Layout from '../components/layout'
import SEO from '../components/seo'
import styles from './index.module.css'

const findFrequenciesByPropertyValue = (edges, { property, value }) => {
  return edges.reduce(
    (colors, { node: { data } }) =>
      data[property] && data[property].toLowerCase() === value
        ? {
            ...colors,
            [data.color]: colors.hasOwnProperty(data.color)
              ? colors[data.color] + 1
              : 1,
          }
        : colors,
    {}
  )
}

export default ({ data }) => {
  const { edges } = data.allAirtable
  const characters = Array.from(
    new Set(
      edges
        .filter(({ node: { data } }) => data.character)
        .map(({ node: { data } }) => data.character.toLowerCase())
    )
  )
  const locations = Array.from(
    new Set(
      edges
        .filter(({ node: { data } }) => data.location)
        .map(({ node: { data } }) => data.location.toLowerCase())
    )
  )
  const themes = Array.from(
    new Set(
      edges
        .filter(({ node: { data } }) => data.theme)
        .map(({ node: { data } }) => data.theme.toLowerCase())
    )
  )
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <h1>Home</h1>
      <h2>Characters</h2>
      <div className={styles.grid}>
        {characters.map(character => (
          <>
            <Link to={`characters/${character}`}>{character}</Link>
            <Badge
              frequencies={findFrequenciesByPropertyValue(edges, {
                property: 'character',
                value: character,
              })}
            />
          </>
        ))}
      </div>
      <hr />
      <h2>Locations</h2>
      <div className={styles.grid}>
        {locations.map(location => (
          <>
            <Link to={`locations/${location}`}>{location}</Link>
            <Badge
              frequencies={findFrequenciesByPropertyValue(edges, {
                property: 'location',
                value: location,
              })}
            />
          </>
        ))}
      </div>
      <hr />
      <h2>Themes</h2>
      <div className={styles.grid}>
        {themes.map(theme => (
          <>
            <Link to={`themes/${theme}`}>{theme}</Link>
            <Badge
              frequencies={findFrequenciesByPropertyValue(edges, {
                property: 'theme',
                value: theme,
              })}
            />
          </>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allAirtable {
      edges {
        node {
          data {
            character
            color
            location
            theme
          }
        }
      }
    }
  }
`
