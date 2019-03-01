import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const findFrequenciesByPropertyValue = (edges, { property, value }) =>
  edges.reduce(
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

export default ({ data }) => {
  // const { edges } = data.allAirtable
  // const books = Array.from(
  //   new Set(edges.map(({ node: { data } }) => data.book))
  // ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  // const characters = Array.from(
  //   new Set(
  //     edges
  //       .filter(({ node: { data } }) => data.character)
  //       .map(({ node: { data } }) => data.character.toLowerCase())
  //   )
  // ).sort((a, b) => a.localeCompare(b))
  // const locations = Array.from(
  //   new Set(
  //     edges
  //       .filter(({ node: { data } }) => data.location)
  //       .map(({ node: { data } }) => data.location.toLowerCase())
  //   )
  // ).sort((a, b) => a.localeCompare(b))
  // const themes = Array.from(
  //   new Set(
  //     edges
  //       .filter(({ node: { data } }) => data.theme)
  //       .map(({ node: { data } }) => data.theme.toLowerCase())
  //   )
  // ).sort((a, b) => a.localeCompare(b))
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <h1>Home</h1>
      {/*
      <h2>Books</h2>
      <div className={styles.grid}>
        {books.map(book => (
          <>
            <Link key={`${book}-link`} to={`books/${book}`}>
              {book}
            </Link>
            <Badge
              frequencies={findFrequenciesByPropertyValue(edges, {
                property: 'book',
                value: book,
              })}
              key={`${book}-badge`}
            />
          </>
        ))}
      </div>
      <hr />
      <h2>Characters</h2>
      <div className={styles.grid}>
        {characters.map(character => (
          <>
            <Link key={`${character}-link`} to={`characters/${character}`}>
              {character}
            </Link>
            <Badge
              frequencies={findFrequenciesByPropertyValue(edges, {
                property: 'character',
                value: character,
              })}
              key={`${character}-badge`}
            />
          </>
        ))}
      </div>
      <hr />
      <h2>Locations</h2>
      <div className={styles.grid}>
        {locations.map(location => (
          <>
            <Link key={`${location}-link`} to={`locations/${location}`}>
              {location}
            </Link>
            <Badge
              frequencies={findFrequenciesByPropertyValue(edges, {
                property: 'location',
                value: location,
              })}
              key={`${location}-badge`}
            />
          </>
        ))}
      </div>
      <hr />
      <h2>Themes</h2>
      <div className={styles.grid}>
        {themes.map(theme => (
          <>
            <Link key={`${theme}-link`} to={`themes/${theme}`}>
              {theme}
            </Link>
            <Badge
              frequencies={findFrequenciesByPropertyValue(edges, {
                property: 'theme',
                value: theme,
              })}
              key={`${theme}-badge`}
            />
          </>
        ))}
      </div>
        */}
    </Layout>
  )
}
