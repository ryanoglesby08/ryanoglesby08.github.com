import React from 'react'

import { rhythm } from '../../utils/typography'

const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
}

const liStyle = {
  display: 'inline',
  margin: 0,
  padding: 0,
  marginRight: rhythm(1),
}

const Nav = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <ul style={ulStyle}>
      <li style={liStyle}>Me</li>
      <li style={liStyle}>OSS</li>
      <li style={liStyle}>Featured</li>
    </ul>

    <ul style={ulStyle}>
      <li style={liStyle}>Github</li>
      <li style={liStyle}>Feed</li>
      <li style={liStyle}>Twitter</li>
      <li style={liStyle}>LinkedIn</li>
    </ul>
  </div>
)

export default Nav
