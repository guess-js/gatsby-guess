module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-wikipedia`,
      options: {
        queries: [
          {
            query: `progressive web app`,
            limit: 5,
          },
          {
            query: `cheese`,
            limit: 10,
          },
          {
            query: `heritage`,
            limit: 10,
          },
          {
            query: `dolphin`,
            limit: 10,
          },
          {
            query: `javascript`,
            limit: 10,
          },
          {
            query: `react.js`,
            limit: 10,
          },
          {
            query: `gatsby`,
            limit: 10,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
