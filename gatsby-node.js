const path = require(`path`)
const slug = require(`slug`)
const _ = require(`lodash`)

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `WikipediaArticle`) {
    createNodeField({
      node,
      name: `slug`,
      value: `/${slug(node.wikipediaId)}/`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`./src/templates/article.js`)
  const queryPageTemplate = path.resolve(`./src/templates/query-page.js`)
  createPage({
    path: `/_/`,
    matchPath: `/wiki/*`,
    component: articleTemplate,
  })

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allWikipediaArticle {
              edges {
                node {
                  query
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(results => {
        const uniqQueries = _.uniq(
          results.data.allWikipediaArticle.edges.map(({ node }) => node.query)
        )
        uniqQueries.forEach(query =>
          createPage({
            path: `/query/${query}/`,
            component: queryPageTemplate,
            context: { query },
          })
        )
        results.data.allWikipediaArticle.edges.forEach(({ node }) => {
          createPage({ path: node.fields.slug, component: articleTemplate })
        })
        return
      })
    )
  })
}
