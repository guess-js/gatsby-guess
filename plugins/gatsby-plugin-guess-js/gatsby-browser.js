const { guess } = require("guess-webpack/api")

exports.disableCorePrefetching = () => true

const currentPathname = () =>
  window.location.pathname.slice(-1) === `/`
    ? window.location.pathname.slice(0, -1)
    : window.location.pathname

let initialPath
let notNavigated = true
exports.onRouteUpdate = ({ location }) => {
  if (initialPath !== location.pathname) {
    notNavigated = false
    return
  }
  initialPath = location.pathname
}

let webpackChunks
let chunksPromise
const chunks = pathPrefix => {
  if (!chunksPromise) {
    chunksPromise = fetch(`${window.location.origin}/webpack.stats.json`).then(
      res => res.json()
    )
  }

  return chunksPromise
}

let hasPrefetched = {}
const prefetch = url => {
  if (hasPrefetched[url]) {
    return
  }
  hasPrefetched[url] = true
  const link = document.createElement("link")
  link.setAttribute("rel", "prefetch")
  link.setAttribute("href", url)
  const parentElement =
    document.getElementsByTagName("head")[0] ||
    document.getElementsByName("script")[0].parentNode
  parentElement.appendChild(link)
}

exports.onPrefetchPathname = ({ pathname, pathPrefix }) => {
  const shouldPrefetch = guess(currentPathname(), [pathname])

  // Don't prefetch from client for the initial path as we did that
  // during SSR
  if (notNavigated && initialPath === window.location.pathname) {
    return
  }

  if (Object.keys(shouldPrefetch).length > 0) {
    Object.keys(shouldPrefetch).forEach(p => {
      chunks(pathPrefix).then(chunk => {
        const page = ___loader.getPage(p)
        let resources = []
        if (chunk.assetsByChunkName[page.componentChunkName]) {
          resources = resources.concat(
            chunk.assetsByChunkName[page.componentChunkName]
          )
        }
        resources.push(`static/d/${___dataPaths[page.jsonName]}.json`)
        // TODO add support for pathPrefix
        resources.forEach(r => prefetch(`/${r}`))
      })
    })
  }
}
