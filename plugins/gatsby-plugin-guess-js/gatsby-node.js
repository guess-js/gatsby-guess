const { GuessPlugin } = require(`guess-webpack`)
console.log({ GuessPlugin })

exports.onCreateWebpackConfig = ({ actions }, pluginOptions) => {
  const { period, GAViewID } = pluginOptions
  actions.setWebpackConfig({
    plugins: [
      new GuessPlugin({
        // GA view ID.
        GA: GAViewID,

        // Hints Guess to not perform prefetching and delegate this logic to
        // its consumer.
        runtime: {
          delegate: true,
        },

        // Since Gatsby already has the required metadata for pre-fetching,
        // Guess does not have to collect the routes and the corresponding
        // bundle entry points.
        routeProvider: false,

        // Optional argument. It takes the data for the last year if not
        // specified.
        period: period ? period : undefined,
      }),
    ],
  })
}
