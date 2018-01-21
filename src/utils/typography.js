import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  // Code highlighting.
  // @see https://github.com/gatsbyjs/gatsby/blob/master/examples/using-remark/src/utils/typography.js
  "tt, code": {
      fontFamily: `"Space Mono",Consolas,"Roboto Mono","Droid Sans Mono","Liberation Mono",Menlo,Courier,monospace`,
      // Disable ligatures as they look funny w/ Space Mono as code.
      fontVariant: `none`,
      WebkitFontFeatureSettings: `"clig" 0, "calt" 0`,
      fontFeatureSettings: `"clig" 0, "calt" 0`,
      paddingTop: `0.1em`,
      paddingBottom: `0.1em`,
      backgroundColor: `#fdf6e3`,
      borderRadius: `2px`,
  },
  // Add space before and after code/tt elements.
  // @see https://github.com/KyleAMathews/typography.js/blob/66f78f0f4b8d2c5abf0262bcc1118610139c3b5f/packages/typography-plugin-code/src/index.js#L38-L46
  "code:before,code:after,tt:before,tt:after": {
      letterSpacing: `-0.2em`,
      content: `"\u00A0"`,
  },
  // But don't add spaces if the code is inside a pre.
  "pre code:before,pre code:after,pre tt:before,pre tt:after": {
      content: `""`,
  },
})

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
