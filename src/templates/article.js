import React from "react"
import Layout from "../components/layout"
import { navigateTo } from "gatsby"
import fetch from "node-fetch"

import "./article.css"

const promiseCache = {}
const htmlCache = {}

const fetchArticle = name => {
  if (typeof window === undefined) {
    return
  }
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
    // eslint-disable-next-line
    const matches = __GUESS__.guess(this.props.location.pathname)
    Object.keys(matches).forEach(match => fetchArticle(match.slice(6)))
    let toRender = ``
    const articleName = this.props.location.pathname.slice(6)
    if (this.props.location.pathname === `_`) {
      return <div>hi</div>
    }
    if (this.props.data.wikipediaArticle) {
      toRender = this.props.data.wikipediaArticle.rendered
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
              fetchArticle(pathname.slice(6))
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
