import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'

import { rhythm } from '../../utils/typography'

import BareList from '../BareList'
import Icon, { GITHUB, LINKEDIN, RSS, TWITTER } from '../Icon'

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

const BareLink = styled.a({
  textDecoration: 'none',
})

const hrMargin = rhythm(1 / 8)
const TopNavHr = styled.hr({
  marginTop: hrMargin,
})
const BottomNavHr = styled.hr({
  marginBottom: hrMargin,
})

const Nav = ({ top }) => (
  <div>
    {!top && <BottomNavHr />}

    <Wrapper>
      <InlineList>
        <li>
          <Link to="/">Blog</Link>
        </li>
        <li>
          <Link to="/about">Me</Link>
        </li>
      </InlineList>

      <InlineList>
        <li>
          <BareLink href="https://github.com/ryanoglesby08">
            <Icon icon={GITHUB} />
          </BareLink>
        </li>
        <li>
          <BareLink href="https://twitter.com/ryanoglesby08">
            <Icon icon={TWITTER} />
          </BareLink>
        </li>
        <li>
          <BareLink href="https://www.linkedin.com/in/ryanoglesby08">
            <Icon icon={LINKEDIN} />
          </BareLink>
        </li>
        <li>
          <BareLink href="/rss.xml">
            <Icon icon={RSS} />
          </BareLink>
        </li>
      </InlineList>
    </Wrapper>

    {top && <TopNavHr />}
  </div>
)

export default Nav
