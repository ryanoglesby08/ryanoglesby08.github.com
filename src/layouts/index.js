import React from 'react'
import { Container } from 'react-responsive-grid'

import { rhythm } from '../utils/typography'

import Header from '../components/Header'
import Footer from '../components/Footer'

import 'prismjs/themes/prism-solarizedlight.css'

const isRootPath = pathname => {
  let rootPath = '/'
  if (typeof __PREFIX_PATHS__ !== 'undefined' && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + '/'
  }

  return pathname === rootPath
}

const Template = ({ location, children }) => (
  // TODO: Switch to emotion. React responsive grid seems to use inline styles...
  <Container
    style={{
      maxWidth: rhythm(24),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }}
  >
    <Header root={isRootPath(location.pathname)} />
    {children()}
    <Footer />
  </Container>
)

export default Template
