const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const legacyPosts = require('./legacyPosts')

const createRedirectPagesForLegacyPaths = createPage => {
  const redirectPagePath = path.resolve('./src/templates/Redirect.js')

  Object.keys(legacyPosts).forEach(legacyPath => {
    createPage({
      path: legacyPath,
      layout: 'Empty',
      component: redirectPagePath,
      context: {
        newPath: legacyPosts[legacyPath],
      },
    })
  })
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  createRedirectPagesForLegacyPaths(createPage)

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach((post, index) => {
          const previous = index === posts.length - 1 ? false : posts[index + 1].node
          const next = index === 0 ? false : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
