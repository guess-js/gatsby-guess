import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)

  return (
    <Layout>
      <h1>Gatsby/Guess.js Wikipedia Demo</h1>
      <p>Hi, welcome to the demo</p>
      <h2>Server rendered pages by query term</h2>
      <ul>
        {data.allWikipediaArticle.group.map(({ fieldValue, totalCount }) => (
          <li key={fieldValue}>
            <Link to={`/query/${fieldValue}/`}>
              {fieldValue} ({totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query FrontPage {
    allWikipediaArticle {
      group(field: query) {
        fieldValue
        totalCount
      }
    }
  }
`
