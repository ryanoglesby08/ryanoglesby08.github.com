import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

import { rhythm } from '../../utils/typography'

import BareList from '../BareList'

const Wrapper = styled.nav({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
})

const InlineList = styled(BareList)({
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
    <InlineList>
      <li>
        <Link to="/me">Me</Link>
      </li>
      <li>
        <Link to="/oss">OSS</Link>
      </li>
      <li>
        <Link to="/featured">Featured</Link>
      </li>
    </InlineList>

    <InlineList>
      <li>Github</li>
      <li>Feed</li>
      <li>Twitter</li>
      <li>LinkedIn</li>
    </InlineList>
  </Wrapper>
)

export default Nav
