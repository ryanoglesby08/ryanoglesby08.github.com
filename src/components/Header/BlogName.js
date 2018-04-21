import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

const BareLink = styled(Link)({
  boxShadow: 'none',
  textDecoration: 'none',
  color: 'inherit',
})

const BlogName = () => <BareLink to="/">Ryan Oglesby</BareLink>

export default BlogName
