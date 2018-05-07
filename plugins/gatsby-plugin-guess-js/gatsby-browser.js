const { guess } = require("guess-webpack/api")

exports.onClientEntry = () => {
  console.log({ guess })
  // Throws error cause runtime doesn't exist.
  console.log({ guessPrediction: guess(`/`) })
}
