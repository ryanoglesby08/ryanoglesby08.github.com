import React from 'react'
import styled from 'react-emotion'

import { rhythm, scale, options } from '../../utils/typography'

import BlogName from './BlogName'
import Nav from '../Nav'

const SiteTitle = styled.h1({
  ...scale(1.5),
})

const SmallName = styled.span({
  ...scale(0.5),
  fontFamily: options.headerFontFamily.join(','),
  fontWeight: options.headerWeight,
})

const Header = ({ root }) => {
  let blogName

  if (root) {
    blogName = (
      <SiteTitle>
        <BlogName />
      </SiteTitle>
    )
  } else {
    blogName = (
      <SmallName>
        <BlogName />
      </SmallName>
    )
  }

  return (
    <header>
      {blogName}

      <Nav top />
    </header>
  )
}

export default Header
