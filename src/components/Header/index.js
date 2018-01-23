import React from 'react'

import { rhythm, scale } from '../../utils/typography'

import BlogName from './BlogName'
import Nav from './Nav'

const Header = ({ root }) => {
  let blogName

  if (root) {
    blogName = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <BlogName />
      </h1>
    )
  } else {
    blogName = (
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          marginTop: 0,
          marginBottom: rhythm(-1),
        }}
      >
        <BlogName />
      </h3>
    )
  }

  return (
    <blogName>
      {blogName}
      <Nav />

      <hr />
    </blogName>
  )
}

export default Header
