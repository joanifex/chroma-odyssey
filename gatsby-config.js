require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: 'Chroma: Odyssey',
    description: '',
    author: '@wrightianb',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
      },
    },
    {
      resolve: 'gatsby-source-airtable',
      options: {
        tables: [
          {
            baseId: 'appu1ESPUJF7NHdoq',
            tableName: 'Main',
            tableLinks: ['color-reference'],
          },
          {
            baseId: 'appu1ESPUJF7NHdoq',
            tableName: 'Colors',
          },
        ],
      },
    },
  ],
}
