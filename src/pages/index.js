import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <h1>Gatsby/Guess.js Wikipedia</h1>
      <p>
        Hi. Welcome to a demo of a Wikipedia client built using{" "}
        <a href="https://github.com/guess-js/guess">Guess.js</a> and{" "}
        <a href="https://www.gatsbyjs.org">Gatsby</a>. Try out some of the
        articles below.
      </p>
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
