import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

import { rhythm } from '../../utils/typography'

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const BareList = styled.ul({
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  '& li:not(last-child)': {
    display: 'inline',
    margin: 0,
    padding: 0,
    marginRight: rhythm(0.75),
  },
  '& li:last-child': {
    marginRight: 0,
  },
})

const Nav = () => (
  <Wrapper>
    <BareList>
      <li>
        <Link to="/me">Me</Link>
      </li>
      <li>
        <Link to="/oss">OSS</Link>
      </li>
      <li>
        <Link to="/featured">Featured</Link>
      </li>
    </BareList>

    <BareList>
      <li>Github</li>
      <li>Feed</li>
      <li>Twitter</li>
      <li>LinkedIn</li>
    </BareList>
  </Wrapper>
)

export default Nav
