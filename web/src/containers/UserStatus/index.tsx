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
  Icon,
} from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom'
import RightSideDrawer from '../RightSideDrawer'
import { User } from '../../typings'

const styles = require('./userStatus.scss')

const initState = {
  position: '',
  panelOn: false,
}
/* eslint-disable */
interface UserStatusProps {
  history: any
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
    if (process.env.NODE_ENV === 'production') {
      this.interval = setInterval(() => {
        this.getIdentityInfo()
      }, 1000)
    }
  }
  public componentWillUnmount () {
    clearInterval(this.interval)
  }

  private getIdentityInfo = () => {
    if (window.identityContract) {
      // window.identityContract.methods
      //   .name()
      //   .call()
      //   .then(name => {
      //     this.setState({ name })
      //   })
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
  private userList = users => (
    <List>
      {users.map(user => (
        <ListItem
          key={user}
          onClick={() => this.props.fight(user, 0)}
          classes={{ root: styles.user }}
        >
          <ListItemText primary={user} />
        </ListItem>
      ))}
    </List>
  )
  private interval: any
  public render () {
    const { panelOn } = this.state
    const { positionName, users } = this.props
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="body2"
              color="inherit"
              classes={{ root: styles.expand }}
            >
              Position: {positionName}
            </Typography>
            <Divider />
            <Button onClick={this.navToMap}>Map</Button>
            <Button onClick={this.togglePanel}>User List</Button>
          </Toolbar>
        </AppBar>
        <RightSideDrawer panelOn={panelOn} togglePanel={this.togglePanel}>
          <React.Fragment>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="title"
                  color="inherit"
                  classes={{ root: styles.expand }}
                >
                  Users Here
                </Typography>
                <Icon onClick={this.togglePanel}>close</Icon>
              </Toolbar>
            </AppBar>
            {this.userList(users)}
          </React.Fragment>
        </RightSideDrawer>
      </React.Fragment>
    )
  }
}

export default UserStatus
