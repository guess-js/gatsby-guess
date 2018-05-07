const { GuessPlugin } = require(`guess-webpack`)
const { guess } = require(`guess-webpack/api`)
console.log({ guess })

let guessPlugin
exports.onPreBootstrap = (_, pluginOptions) => {
  console.log({ pluginOptions })
  const { period, GAViewID } = pluginOptions
  guessPlugin = new GuessPlugin({
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
    // period: period ? period : undefined,
    period: {
      startDate: new Date("2018-1-1"),
      endDate: new Date("2018-5-5"),
    },
  })
}

exports.onCreateWebpackConfig = ({ actions, stage }, pluginOptions) => {
  console.log({ guessPlugin, stage })
  actions.setWebpackConfig({
    plugins: [guessPlugin],
  })
  // console.log({ guessPredictions: guess(`/`) })
}
