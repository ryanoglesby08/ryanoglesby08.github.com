import React from 'react'
import Helmet from 'react-helmet'
import styled from 'react-emotion'
import Link from 'gatsby-link'

import get from 'lodash/get'
import ReactDisqusThread from 'react-disqus-thread'

import { rhythm, scale } from '../utils/typography'

import BareList from '../components/BareList'

const NextAndPrevLinks = styled(BareList)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  '& li': {
    maxWidth: '50%',
  },
})

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}>
          <script async src="https://production-assets.codepen.io/assets/embed/ei.js" />
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
        </Helmet>

        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        <NextAndPrevLinks>
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </NextAndPrevLinks>

        {process.env.NODE_ENV === 'production' && (
          <ReactDisqusThread shortname="ryanoglesby" title={post.frontmatter.title} />
        )}
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
