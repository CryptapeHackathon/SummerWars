// TODO: Import and Export wallet
// TODO: Unlock Wallet
// TODO: Select Account
import * as React from 'react'
import { hot } from 'react-hot-loader'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core'
import { withWeb3, WithWeb3 } from '../../contexts/web3'
// import { Account } from '../../typings'

import Dialogue from '../../components/Dialogue'

enum LoginAction {
  CREATE = 'create',
  CANCEL = 'cancel',
  LOGIN = 'login',
  LOAD = 'load',
  SAVE = 'save',
}

enum WalletStatus {
  NONE,
  CACHED,
  LOADED,
  SAVING,
}

const walletKey = 'web3js_wallet'

interface GameStartProps extends WithWeb3 {}
const initGameStartState = {
  selectedAccount: '',
  pwd: '',
  // accounts: [] as Account[],
  wallet: {} as any,
  walletStatus: WalletStatus.NONE,
}

class GameStart extends React.Component<
  GameStartProps,
  typeof initGameStartState
  > {
  state = initGameStartState
  // componentWillMount() {
  //   this.props.web3.eth.accounts.wallet.load()
  // }
  componentWillMount () {
    // check if logged
    // if logged, to scene

    // if not logged, show dialog
    // check if wallet cached
    // if cached
    if (this.checkCachedWallet()) {
      this.setState({
        walletStatus: WalletStatus.CACHED,
      })
    }
    // enter pwd to load cached wallet
    // if no cached
    // create wallet

    // this.setState({

    //   hasCachedWallet: this.checkCachedWallet(),
    // })
  }
  public componentDidMount () {
    window.web3 = this.props.web3
  }

  private handleInput = (key: string) => e => {
    const { value } = e.currentTarget
    this.setState({ pwd: value })
  }
  private handleKeyPress = (key: string) => (e: React.KeyboardEvent) => {
    if (key !== 'pwd') return
    if (e.keyCode === 13) {
      this.loadWallet()
    }
  }
  private checkCachedAccount = () => {}
  private checkCachedWallet = () => !!window.localStorage.getItem(walletKey)
  private loadWallet = () => {
    const wallet = this.props.web3.eth.accounts.wallet.load(
      this.state.pwd,
      walletKey,
    )
    this.setState({ wallet })
  }
  private saveWallet = () => {
    this.props.web3.eth.accounts.wallet.save(this.state.pwd)
  }
  private createWallet = () => {
    const rnd = this.props.web3.utils.randomHex(32)
    const wallet = this.props.web3.eth.accounts.wallet.create(1, rnd)
    this.setState({ wallet })
  }

  private handleClick = (key: LoginAction) => e => {
    switch (key) {
      case LoginAction.CREATE: {
        return this.createWallet()
      }
      case LoginAction.LOAD: {
        return this.loadWallet()
      }
      case LoginAction.LOGIN: {
        return this.login()
      }
      case LoginAction.SAVE: {
        if (this.state.walletStatus === WalletStatus.SAVING) {
          return this.saveWallet()
        }
        return this.setState({
          walletStatus: WalletStatus.SAVING,
        })
      }
      default: {
        if (key.startsWith('0x')) {
          this.setState({ selectedAccount: key })
        }
        return 'none'
      }
    }
  }
  private login = () => {
    // set default account
    // this.props.web3.eth.accounts.wallet.save(this.state.pwd)
    this.props.web3.eth.defaultAccount = this.state.selectedAccount
    console.log('login')
  }
  private PWDTextField = () => (
    <React.Fragment>
      <TextField
        value={this.state.pwd}
        onChange={this.handleInput('pwd')}
        type="password"
        label="Password"
        onKeyPress={this.handleKeyPress('pwd')}
      />
    </React.Fragment>
  )
  public render () {
    const accounts = [
      ...new Set(
        Object.keys(this.state.wallet)
          .filter(key => key.startsWith('0x'))
          .map(key => this.state.wallet[key]),
      ),
    ]
    console.log(accounts)
    return (
      <React.Fragment>
        <div>GameStart</div>
        <Dialogue isOpen>
          <DialogTitle>Roles</DialogTitle>
          <DialogContent>
            {this.state.walletStatus === WalletStatus.CACHED ||
            this.state.walletStatus === WalletStatus.SAVING
              ? this.PWDTextField()
              : null}
            {
              <List subheader={<li />}>
                {accounts.map(account => (
                  <ListItem
                    key={account.address}
                    onClick={this.handleClick(account.address)}
                  >
                    <ListItemText primary={account.address} />
                  </ListItem>
                ))}
              </List>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick(LoginAction.SAVE)}>
              {LoginAction.SAVE}
            </Button>
            <Button onClick={this.handleClick(LoginAction.CREATE)}>
              {LoginAction.CREATE}
            </Button>
            {this.state.walletStatus === WalletStatus.CACHED ? (
              <Button onClick={this.handleClick(LoginAction.LOAD)}>
                {LoginAction.LOAD}
              </Button>
            ) : null}
            {this.state.selectedAccount ? (
              <Button onClick={this.handleClick(LoginAction.LOGIN)}>
                {LoginAction.LOGIN}
              </Button>
            ) : null}
          </DialogActions>
        </Dialogue>
      </React.Fragment>
    )
  }
}

export default withWeb3(hot(module)(GameStart))
