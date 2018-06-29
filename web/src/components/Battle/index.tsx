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
  Divider,
} from '@material-ui/core'

function Transition (props) {
  return <Slide direction="up" {...props} />
}

const Battle = ({ battleOn, user1, user2, closeBattle }) => (
  <Dialog
    fullScreen
    open={battleOn}
    onClose={closeBattle}
    TransitionComponent={Transition}
  >
    <AppBar>
      <Toolbar>
        <Icon>close</Icon>
        <Typography variant="title" color="inherit">
          {user1}
          VS
          {user2}
        </Typography>
        <Button color="inherit" onClick={closeBattle} />
      </Toolbar>
    </AppBar>
    <List>
      <ListItem button>
        <ListItemText primary="Phone ringtone" secondary="Titania" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText
          primary="Default notification ringtone"
          secondary="Tethys"
        />
      </ListItem>
    </List>
  </Dialog>
)
export default Battle
