import Typography from 'typography'
import Alton from 'typography-theme-alton'
import CodePlugin from 'typography-plugin-code'

Alton.baseFontSize = '16px' // was 18px
Alton.baseLineHeight = 1.75 // was 1.45

Alton.plugins = [new CodePlugin()]

const typography = new Typography(Alton)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
