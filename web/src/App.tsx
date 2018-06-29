import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'
import { CssBaseline } from '@material-ui/core'
import Loadable from './components/Loadable'
import './styles/common'
import { Web3Provider } from './contexts/web3'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#202124',
    },
    secondary: pink,
    error: red,
    type: 'dark',
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeightRegular: 400,
  },
})

const history = createBrowserHistory()
export interface WithRoute {
  history: typeof history
}

const switchedContainers = [
  {
    path: '/',
    exact: true,
    component: 'Homepage',
  },
  // {
  //   path: '/play',
  //   exact: true,
  //   component: 'Play',
  // },
  {
    path: '/start',
    exact: true,
    component: 'GameStart',
  },
  {
    path: '/',
    exact: false,
    component: 'UserStatus',
  },
]
const containers = [
  // {
  //   path: '/',
  //   exact: false,
  //   component: 'Header',
  // },
  {
    path: '/prologue',
    exact: true,
    component: 'Prologue',
  },
  {
    path: '/map',
    exact: true,
    component: 'Map',
  },
]

const routes = containers.map(container => (
  <Route
    {...container}
    key={container.component}
    component={Loadable({
      loader: () => import(`./containers/${container.component}`),
    })}
  />
))

const switchRoutes = switchedContainers.map(container => (
  <Route
    {...container}
    key={container.component}
    component={Loadable({
      loader: () => import(`./containers/${container.component}`),
    })}
  />
))

const themedApp = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <React.Fragment>
        <Switch>{switchRoutes}</Switch>
        {routes}
      </React.Fragment>
    </Router>
  </MuiThemeProvider>
)

export default Web3Provider(themedApp)
