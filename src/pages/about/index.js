import React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet'

import Img from 'gatsby-image'

import { rhythm } from '../../utils/typography'
import Icon, { LAPTOP, LOCATION } from '../../components/Icon'

const LayoutSideBySide = styled.div({
  display: 'flex',
  flexDirection: 'column',

  '@media (min-width: 576px)': {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
})

const Profile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: rhythm(1),

  '@media (min-width: 576px)': {
    marginRight: rhythm(1),
  },
})

const profilePicStyles = {
  borderRadius: '50%',
}

const AboutMe = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const profilePicResolutions = data.profilePic.resolutions

  return (
    <div>
      <LayoutSideBySide>
        <Helmet title={`About Me | ${siteTitle}`} />

        <Profile>
          <Img
            alt="Ryan's profile photo"
            resolutions={profilePicResolutions}
            imgStyle={profilePicStyles}
          />
          <span>
            <Icon icon={LOCATION} /> Chicago, USA
          </span>
          <span>
            <Icon icon={LAPTOP} /> Front-end Developer
          </span>
        </Profile>

        <div>
          <p>Hi! I'm Ryan.</p>

          <p>
            I'm a software consultant at <a href="https://www.thoughtworks.com">ThoughtWorks</a>{' '}
            doing mostly front-end things these days, though my background is a full-stack
            "generalist". In particular I'm passionate about design systems, the React ecosystem,
            and open source software.
          </p>

          <p>
            When I'm not coding I am staying active - rock climbing, snowboarding, playing
            volleyball, or galavanting around the world.
          </p>
        </div>
      </LayoutSideBySide>

      <p>
        I also post on the{' '}
        <a href="https://www.thoughtworks.com/profiles/ryan-oglesby">ThoughtWorks Insights</a> blog
        occasionally; and speak at conferences.
      </p>
      <ul>
        <li>OSCON, 2016: "Transitioning to Microservices"</li>
        <li>
          Chicago Coders Conference, 2017: "UI Components by Design: Bridging the Designer Developer
          Gap"
        </li>
      </ul>
    </div>
  )
}

export default AboutMe

export const query = graphql`
  query ProfilePic {
    site {
      siteMetadata {
        title
      }
    }
    profilePic: imageSharp(id: { regex: "/profile/" }) {
      # Specify the image processing specifications right in the query.
      # Makes it trivial to update as your page's design changes.
      resolutions(width: 200, height: 200) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`