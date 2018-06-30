import * as React from 'react'
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  Icon,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

const b1 = require('../../images/battle/1.jpg')
const b2 = require('../../images/battle/2.jpg')
const b3 = require('../../images/battle/3.gif')
const b4 = require('../../images/battle/4.jpeg')
const b5 = require('../../images/battle/5.jpeg')
const b6 = require('../../images/battle/6.jpeg')
const b7 = require('../../images/battle/7.jpeg')
const b8 = require('../../images/battle/8.jpeg')
const b9 = require('../../images/battle/9.jpeg')

/* eslint-disable */
const hexToBytes = (hex: string) => {
  for (var bytes = [] as any[], c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16))
  }
  return bytes
}
/* eslint-enable */

function Transition (props) {
  return <Slide direction="up" {...props} />
}

const initBattleState = {
  rounds: [] as { winner: string }[],
}

class Battle extends React.Component<any, any> {
  state = {
    rounds: [],
  }
  public componentDidMount () {
    this.battle()
  }
  public componentWillUnmount () {
    console.log('unmount')
  }

  // public componentWillReceiveProps(nextProps) {
  //   if (nextProps.user2 !== this.props.user2) {
  //     this.battle()
  //   }
  // }
  public battle = () => {
    let i = 0
    const { user1, user2 } = this.props

    const rounds = user1.length
    this.interval = setInterval(() => {
      if (i >= rounds) clearInterval(this.interval)
      i += 1
      if (user1[i] > user2[i]) {
        return this.setState(state => ({
          rounds: [...state.rounds, { winner: user1 }],
        }))
      }
      if (user1[i] < user2[i]) {
        return this.setState(state => ({
          rounds: [...state.rounds, { winner: user2 }],
        }))
      }
      return this.setState(state => ({
        rounds: [...state.rounds, { winner: '' }],
      }))
    }, 300)
  }
  private interval: any
  render () {
    const { rounds } = this.state
    const { battleOn, user1, user2, closeBattle } = this.props
    return (
      <Dialog
        fullScreen
        open={battleOn}
        onClose={closeBattle}
        TransitionComponent={Transition}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="body2"
              color="inherit"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {user1} VS {user2}
            </Typography>
            <Button color="inherit" onClick={closeBattle}>
              <Icon onClick={closeBattle}>close</Icon>
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {rounds.map((round: any, idx) => (
            <ListItem key={Math.random()}>
              {round.winner ? (
                <React.Fragment>
                  <ListItemText primary={`${round.winner} attack`} />
                  <img src={`b${Math.round(Math.random() * 10)}`} alt="pic" />
                </React.Fragment>
              ) : (
                <ListItemText primary="Take a rest" />
              )}
            </ListItem>
          ))}
        </List>
      </Dialog>
    )
  }
}

export default Battle
// {rounds.map(({ round, idx }) => (
//   <ListItem key={`round-${idx}`}>
//     <ListItemText primary={round.winner + 'attacked'} />
//     <img src={'b' + Math.round(Math.random() * 10)} />
//   </ListItem>
// ))}
