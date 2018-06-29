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
/* eslint-disable */
interface UserStatusProps {
  history: any
  // location: any
  // match: any
  users: string[]
  positionName: string
  fight: Function
}
/* eslint-enable */
class UserStatus extends React.Component<UserStatusProps, any> {
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
  private UserList = users => (
    <List>
      {users.map(user => (
        <ListItem key={user} onClick={() => this.props.fight(user, 0)}>
          <ListItemText primary={user} />
        </ListItem>
      ))}
    </List>
  )
  public render () {
    const { panelOn, name } = this.state
    const { positionName, users } = this.props
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Position: {positionName}
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
          {this.UserList(users)}
        </RightSideDrawer>
      </React.Fragment>
    )
  }
}

export default UserStatus
