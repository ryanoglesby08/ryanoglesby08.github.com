import React from 'react'
import Helmet from 'react-helmet'

const Redirect = ({ data, pathContext }) => {
  const { newPath } = pathContext
  const newUrl = `${data.site.siteMetadata.siteUrl}${newPath}`

  return (
    <div>
      <Helmet>
        <title>{`Moved to new URL: ${newUrl}`}</title>

        <meta httpEquiv="refresh" content={`0;url=${newPath}`} />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <h1>This post has been moved</h1>

      <p>{`This post has been moved to ${newUrl}`}</p>

      <p>
        If your browser doesn't redirect you to the new location please{' '}
        <a href={newPath}>click here</a>.
      </p>
    </div>
  )
}

export default Redirect

export const pageQuery = graphql`
  query Redirect {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
