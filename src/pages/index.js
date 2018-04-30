import React from 'react'
import Helmet from 'react-helmet'
import styled from 'react-emotion'

import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm } from '../utils/typography'

import BareList from '../components/BareList'
import PostTitle from '../components/PostTitle'

const PostLi = styled.li({
  marginBottom: rhythm(1),
})

const Excerpt = styled.p({
  marginTop: rhythm(1 / 4),
})

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <BareList>
        <Helmet title={siteTitle} />

        {posts.map(({ node }) => {
          const slug = node.fields.slug

          return (
            <PostLi key={slug}>
              <PostTitle Heading="h2" date={node.frontmatter.date}>
                <Link to={slug}>{node.frontmatter.title}</Link>
              </PostTitle>

              <Excerpt dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </PostLi>
          )
        })}
      </BareList>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
