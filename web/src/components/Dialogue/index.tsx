import * as React from 'react'
import { createPortal } from 'react-dom'
import { Dialog } from '@material-ui/core/'

interface DialogProps {
  isOpen: boolean
}
export default class Dialogue extends React.Component<DialogProps, any> {
  render () {
    const { isOpen, children } = this.props
    return createPortal(
      <Dialog open={isOpen}>{children}</Dialog>,
      document.getElementById('dialogue') as HTMLElement,
    )
  }
}
