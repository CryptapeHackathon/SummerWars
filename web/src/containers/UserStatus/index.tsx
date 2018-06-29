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
  componentWillMount () {
    this.checkIdentityContract()
  }
  public componentDidMount () {
    // setInterval(() => {
    //   this.getIdentityInfo()
    // }, 1000)
  }

  private getIdentityInfo = () => {
    if (window.identityContract) {
      window.identityContract.methods
        .name()
        .call()
        .then(name => {
          this.setState({ name })
        })
    }
  }
  private checkIdentityContract = () => {
    // check if identity has been load
    if (window.identityContract) return
    this.props.history.push('/start')
  }

  private navToMap = e => {
    this.props.history.push('/maps')
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
        <AppBar position="static">
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
