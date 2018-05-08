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
            query: `Game of Thrones`,
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
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Guess.js/Gatsby Wikipedia Demo",
        short_name: "GuessJS Demo",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "guess-icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-118755194-1`,
      },
    },
    {
      resolve: `gatsby-plugin-guess-js`,
      options: {
        GAViewID: `174800394`,
        period: {
          startDate: new Date("2018-1-1"),
          endDate: new Date("2018-5-5"),
        },
      },
    },
  ],
}
