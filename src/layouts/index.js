import React from 'react'
import styled from 'react-emotion'

import { rhythm } from '../utils/typography'

import Header from '../components/Header'
import Footer from '../components/Footer'

// Code highlight theme
import 'prismjs/themes/prism-solarizedlight.css'
import '../utils/prism-solarizedlight-line-highlights.css'

import 'typeface-domine'
import 'typeface-open-sans'

const Container = styled.div({
  margin: '0 auto',
  maxWidth: `${740 / 16}rem`, // 740px in rem with 16px base font size
  padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
})

const isRootPath = pathname => {
  let rootPath = '/'
  if (typeof __PREFIX_PATHS__ !== 'undefined' && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + '/'
  }

  return pathname === rootPath
}

const Template = ({ location, children }) => (
  <Container>
    <Header root={isRootPath(location.pathname)} />
    <main>{children()}</main>
    <Footer />
  </Container>
)

export default Template
