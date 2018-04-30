import Typography from 'typography'
import alton from 'typography-theme-alton'
import CodePlugin from 'typography-plugin-code'

alton.baseFontSize = '16px' // was 18px
alton.baseLineHeight = 1.75 // was 1.45

alton.plugins = [new CodePlugin()]

alton.overrideThemeStyles = () => ({
  a: {
    textDecoration: 'underline',
  },
})

const typography = new Typography(alton)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
