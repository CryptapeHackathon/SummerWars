import * as React from 'react'
import { createPortal } from 'react-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Logo from '../../components/Logo'

const Header = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Logo />
      <Typography variant="title">Hello</Typography>
    </Toolbar>
  </AppBar>
)

export default () => (
  <React.Fragment>
    {createPortal(<Header />, document.getElementById('header') as HTMLElement)}
  </React.Fragment>
)
