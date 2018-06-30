import * as React from 'react'
import { Drawer } from '@material-ui/core'
// import {}

interface PanelProps {
  panelOn: boolean
  togglePanel: (e) => void
  children: React.ReactChild
}

// class RightSideDrawer extends React.Component<PanelProps, {}> {
//   render () {
//     return (
//     )
//   }
// }
const RightSideDrawer: React.SFC<PanelProps> = props => (
  <Drawer anchor="right" open={props.panelOn} onClose={props.togglePanel}>
    {props.children}
  </Drawer>
)

export default RightSideDrawer
