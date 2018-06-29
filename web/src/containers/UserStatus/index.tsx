import * as React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom'
import RightSideDrawer from '../RightSideDrawer'
import { User } from '../../typings'

const initState = {
  position: 'position1',
  name: 'name',
  panelOn: false,
  users: [
    {
      addr: '0xxxx',
    },
  ] as User[],
}
interface UserStatusProps {}
class UserStatus extends React.Component<
  RouteComponentProps<UserStatusProps>,
  any
  > {
  state = initState

  private navToMap = e => {
    this.props.history.push('/map')
  }
  private togglePanel = e => {
    this.setState(state => ({
      panelOn: !state.panelOn,
    }))
  }
  private UserList = () => (
    <List>
      {this.state.users.map(user => (
        <ListItem key={user.addr}>
          <ListItemText primary={user.addr} />
        </ListItem>
      ))}
    </List>
  )
  public render () {
    const { position, panelOn, name } = this.state
    return (
      <React.Fragment>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Position: {position}
            </Typography>
            <Divider />
            <Typography variant="title" color="inherit">
              Role: {name}
            </Typography>
            <Button onClick={this.navToMap}>Map</Button>
            <Button onClick={this.togglePanel}>User List</Button>
          </Toolbar>
        </AppBar>
        <RightSideDrawer panelOn={panelOn} togglePanel={this.togglePanel}>
          {this.UserList()}
        </RightSideDrawer>
      </React.Fragment>
    )
  }
}

export default UserStatus
