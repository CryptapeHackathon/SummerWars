import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

const mount = (Comp: any) =>
  render(<Comp />, document.getElementById('root') as HTMLElement)

mount(App)

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     /* eslint-disable global-require */
//     const NextApp = require('./App').default
//     /* eslint-enable global-require */
//     mount(NextApp)
//   })
// }
