import React from 'react'
import styled from 'react-emotion'

import { rhythm, scale } from '../../utils/typography'

import BlogName from './BlogName'
import Nav from './Nav'

const H1BlogName = styled.h1({
  ...scale(1.5),
  marginTop: 0,
  marginBottom: rhythm(1.5),
})

const H3BlogName = styled.h3({
  fontFamily: 'Montserrat, sans-serif',
  marginTop: 0,
})

const Header = ({ root }) => {
  let blogName

  if (root) {
    blogName = (
      <H1BlogName>
        <BlogName />
      </H1BlogName>
    )
  } else {
    blogName = (
      <H3BlogName>
        <BlogName />
      </H3BlogName>
    )
  }

  return (
    <header>
      {blogName}
      <Nav />

      <hr />
    </header>
  )
}

export default Header
