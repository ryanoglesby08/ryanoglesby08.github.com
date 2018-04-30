import React from 'react'
import { css } from 'react-emotion'

import { rhythm } from '../../utils/typography'

const heading = css({
  marginBottom: 0,
})

const PostTitle = ({ Heading, date, children }) => (
  <div>
    <Heading className={heading}>{children}</Heading>

    <small>{date}</small>
  </div>
)

export default PostTitle
