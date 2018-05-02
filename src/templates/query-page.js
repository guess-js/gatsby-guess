import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data, pageContext }) => {
  return (
    <Layout>
      <h1>
        Query: "{pageContext.context.query}" ({
          data.allWikipediaArticle.totalCount
        })
      </h1>
      <ul>
        {data.allWikipediaArticle.edges.map(({ node }) => {
          return (
            <li>
              <Link to={node.fields.slug}>{node.title}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query QueryPageQuery($query: String) {
    allWikipediaArticle(filter: { query: { eq: $query } }) {
      totalCount
      edges {
        node {
          title
          fields {
            slug
          }
        }
      }
    }
  }
`
