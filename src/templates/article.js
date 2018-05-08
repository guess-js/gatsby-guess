import React from "react"
import Layout from "../components/layout"
import { navigateTo } from "gatsby"

import "./article.css"

const promiseCache = {}
const htmlCache = {}

const fetchArticle = name => {
  if (!promiseCache[name]) {
    promiseCache[name] = fetch(
      `https://wikipedia-server.herokuapp.com/${name}`,
      {
        method: "GET",
        mode: "cors",
      }
    ).then(res => {
      return res.text().then(html => {
        htmlCache[name] = html
        return htmlCache[name]
      })
    })
  }

  return promiseCache[name]
}

export default class ArticleTemplate extends React.Component {
  render() {
    let toRender = ``
    const articleName = this.props.location.pathname.slice(6)
    if (this.props.data.wikipediaArticle) {
      toRender = this.props.data.wikipediaArticle
    } else if (htmlCache[articleName]) {
      toRender = htmlCache[articleName]
    } else if (
      !this.props.data.wikipediaArticle &&
      !promiseCache[articleName]
    ) {
      // eslint-disable-next-line
      fetchArticle(articleName).then(text => {
        this.setState({ articleHTML: text })
      })
    }
    return (
      <Layout>
        <div
          onClick={e => {
            e.preventDefault()
            const pathname = e.target.pathname
            if (pathname) {
              fetchArticle(pathname.slice(6)).then(text => {
                navigateTo(pathname)
              })
            }
          }}
          onMouseMove={e => {
            const pathname = e.target.pathname
            if (pathname) {
              fetchArticle(pathname.slice(6)).then(text =>
              )
            }
          }}
          dangerouslySetInnerHTML={{ __html: toRender }}
        />
      </Layout>
    )
  }
}

export const query = graphql`
  query ArticleQuery($path: String) {
    wikipediaArticle(fields: { slug: { eq: $path } }) {
      title
      rendered
    }
  }
`
