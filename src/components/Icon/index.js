import React from 'react'
import PropTypes from 'prop-types'

import uniqueId from 'lodash/uniqueId'

// All SVG paths come from: https://github.com/Keyamoon/IcoMoon-Free/tree/master/SVG
// See previews here: https://icomoon.io/#preview-free

// https://raw.githubusercontent.com/Keyamoon/IcoMoon-Free/master/SVG/433-github.svg
export const GITHUB = {
  d:
    'M8 0.198c-4.418 0-8 3.582-8 8 0 3.535 2.292 6.533 5.471 7.591 0.4 0.074 0.547-0.174 0.547-0.385 0-0.191-0.008-0.821-0.011-1.489-2.226 0.484-2.695-0.944-2.695-0.944-0.364-0.925-0.888-1.171-0.888-1.171-0.726-0.497 0.055-0.486 0.055-0.486 0.803 0.056 1.226 0.824 1.226 0.824 0.714 1.223 1.872 0.869 2.328 0.665 0.072-0.517 0.279-0.87 0.508-1.070-1.777-0.202-3.645-0.888-3.645-3.954 0-0.873 0.313-1.587 0.824-2.147-0.083-0.202-0.357-1.015 0.077-2.117 0 0 0.672-0.215 2.201 0.82 0.638-0.177 1.322-0.266 2.002-0.269 0.68 0.003 1.365 0.092 2.004 0.269 1.527-1.035 2.198-0.82 2.198-0.82 0.435 1.102 0.162 1.916 0.079 2.117 0.513 0.56 0.823 1.274 0.823 2.147 0 3.073-1.872 3.749-3.653 3.947 0.287 0.248 0.543 0.735 0.543 1.481 0 1.070-0.009 1.932-0.009 2.195 0 0.213 0.144 0.462 0.55 0.384 3.177-1.059 5.466-4.057 5.466-7.59 0-4.418-3.582-8-8-8z',
  allyTitle: 'Github',
  allyDescription: 'The Github logo is an octocat.',
}

// https://raw.githubusercontent.com/Keyamoon/IcoMoon-Free/master/SVG/088-laptop.svg
export const LAPTOP = {
  d:
    'M14 11v-8c0-0.55-0.45-1-1-1h-10c-0.55 0-1 0.45-1 1v8h-2v3h16v-3h-2zM10 13h-4v-1h4v1zM13 11h-10v-7.998c0.001-0.001 0.001-0.001 0.002-0.002h9.996c0.001 0.001 0.001 0.001 0.002 0.002v7.998z',
  allyTitle: 'A laptop',
  allyDescription: 'An open laptop computer',
}

// https://raw.githubusercontent.com/Keyamoon/IcoMoon-Free/master/SVG/459-linkedin2.svg
export const LINKEDIN = {
  d:
    'M6 6h2.767v1.418h0.040c0.385-0.691 1.327-1.418 2.732-1.418 2.921 0 3.461 1.818 3.461 4.183v4.817h-2.885v-4.27c0-1.018-0.021-2.329-1.5-2.329-1.502 0-1.732 1.109-1.732 2.255v4.344h-2.883v-9z M1 6h3v9h-3v-9z M4 3.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z',
  allyTitle: 'Linked In',
  allyDescription:
    'The Linked In logo is the word in displayed in lower case text inside of a square.',
}

// https://github.com/Keyamoon/IcoMoon-Free/blob/master/SVG/072-location.svg
export const LOCATION = {
  d:
    'M8 0c-2.761 0-5 2.239-5 5 0 5 5 11 5 11s5-6 5-11c0-2.761-2.239-5-5-5zM8 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z',
  allyTitle: 'Map pin',
  allyDescription: 'A map pin',
}

// https://raw.githubusercontent.com/Keyamoon/IcoMoon-Free/master/SVG/412-rss.svg
export const RSS = {
  d:
    'M2.13 11.733c-1.175 0-2.13 0.958-2.13 2.126 0 1.174 0.955 2.122 2.13 2.122 1.179 0 2.133-0.948 2.133-2.122-0-1.168-0.954-2.126-2.133-2.126zM0.002 5.436v3.067c1.997 0 3.874 0.781 5.288 2.196 1.412 1.411 2.192 3.297 2.192 5.302h3.080c-0-5.825-4.739-10.564-10.56-10.564zM0.006 0v3.068c7.122 0 12.918 5.802 12.918 12.932h3.076c0-8.82-7.176-16-15.994-16z',
  allyTitle: 'RSS Feed',
  allyDescription: 'The RSS Feed logo is .',
}

// https://raw.githubusercontent.com/Keyamoon/IcoMoon-Free/master/SVG/407-twitter.svg
export const TWITTER = {
  d:
    'M16 3.538c-0.588 0.263-1.222 0.438-1.884 0.516 0.678-0.406 1.197-1.050 1.444-1.816-0.634 0.375-1.338 0.65-2.084 0.797-0.6-0.638-1.453-1.034-2.397-1.034-1.813 0-3.281 1.469-3.281 3.281 0 0.256 0.028 0.506 0.084 0.747-2.728-0.138-5.147-1.444-6.766-3.431-0.281 0.484-0.444 1.050-0.444 1.65 0 1.138 0.578 2.144 1.459 2.731-0.538-0.016-1.044-0.166-1.488-0.409 0 0.013 0 0.028 0 0.041 0 1.591 1.131 2.919 2.634 3.219-0.275 0.075-0.566 0.116-0.866 0.116-0.212 0-0.416-0.022-0.619-0.059 0.419 1.303 1.631 2.253 3.066 2.281-1.125 0.881-2.538 1.406-4.078 1.406-0.266 0-0.525-0.016-0.784-0.047 1.456 0.934 3.181 1.475 5.034 1.475 6.037 0 9.341-5.003 9.341-9.341 0-0.144-0.003-0.284-0.009-0.425 0.641-0.459 1.197-1.038 1.637-1.697z',
  allyTitle: 'Twitter',
  allyDescription: 'The Twitter logo is a small bird in flight.',
}

class Icon extends React.Component {
  componentWillMount() {
    this.setState({
      id: uniqueId('icon-'),
    })
  }

  render() {
    const { icon, ...rest } = this.props

    const allyTitleId = `${this.state.id}_title`
    const allyDescriptionId = `${this.state.id}_description`
    const ariaLabelledBy = [allyTitleId, allyDescriptionId].join(' ')

    return (
      <svg
        {...rest}
        id={this.state.id}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="#000000"
        role="link"
        aria-labelledby={ariaLabelledBy}
      >
        <title id={allyTitleId}>{icon.allyTitle}</title>
        <desc id={allyDescriptionId}>{icon.allyDescription}</desc>

        <path d={icon.d} />
      </svg>
    )
  }
}
Icon.propTypes = {
  icon: PropTypes.oneOf([GITHUB, LAPTOP, LINKEDIN, LOCATION, RSS, TWITTER]).isRequired,
}

export default Icon
