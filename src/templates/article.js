import React from "react"
import Layout from "../components/layout"

import "./article.css"

export default ({ data }) => {
  return (
    <Layout>
      <div
        dangerouslySetInnerHTML={{ __html: data.wikipediaArticle.rendered }}
      />
    </Layout>
  )
}

export const query = graphql`
  query ArticleQuery($path: String) {
    wikipediaArticle(fields: { slug: { eq: $path } }) {
      title
      rendered
    }
  }
`
