// TODO: Import and Export wallet
import * as React from 'react'
import { hot } from 'react-hot-loader'
import {
  DialogContent,
  DialogActions,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  TextField,
  Tabs,
  Tab,
  LinearProgress,
} from '@material-ui/core'
import { withWeb3, WithWeb3 } from '../../contexts/web3'
import registerAbi from '../../contracts/register'
import identityAbi from '../../contracts/identity'
import worldAbi from '../../contracts/world'
import sceneOpAbi from '../../contracts/sceneOp'
import userOpAbi from '../../contracts/userOp'
import contractInfo from '../../contracts'
import getTxReceipt from '../../utils/getTxRecepts'
import { Account } from '../../typings'

/**
 * 1. Check if logged
 * 2. if logged, nav to scene
 * 3. if not, check cached wallet
 * 4. if not cached, create
 * 5. if cached, display pwd input to load wallet
 * 6. if loaded, select one to login
 */

import Dialogue from '../../components/Dialogue'

const commonStyles = require('../../styles/common.scss')
const styles = require('./gameStart.scss')
const bgImg = require('../../images/mordor.jpg')

enum LoginAction {
  CREATE = 'CREATE', // to create account
  CANCEL = 'CANCEL', // nothing
  LOGIN = 'LOGIN', // to login
  LOAD = 'LOAD', // to load wallet from localstorage
  SAVE = 'SAVE', // to save wallet in localstorage
  CONFIRM = 'CONFIRM', // confirm the pwd for action
  IMPORT = 'IMPORT', // import wallet to localstorage
}

enum WalletStatus {
  NONE, // init
  CACHED, // has cached wallet in localstorage, waiting for pwd to load wallet
  LOADED, // has loaded wallet from localstorage
  SAVING, // is saving wallet to localstorage, waiting for pwd
}
enum HelpText {
  NONE = '',
  SAVING = 'saving',
  UNLOCKING = 'Unlocking',
  SUCCESS = 'Success',
  ERROR = 'Error',
  NO_WALLET_FOUND = 'No Wallet Found',
  IMPORTING = 'Importing',
}

const walletKey = 'web3js_wallet'
const ACCOUNT_NOT_EXIST = '0x0000000000000000000000000000000000000000'

/* eslint-disable no-restricted-globals */
interface GameStartProps extends WithWeb3 {
  history: any
}
/* eslint-enable no-restricted-globals */
const initGameStartState = {
  selectedAccount: {} as Account,
  pwd: '',
  wallet: {} as any,
  walletStatus: WalletStatus.NONE,
  action: LoginAction,
  tabIndex: 0, // 0 => login, 1 => unlock, 2 => save, 3 => import
  helperText: HelpText.NONE,
  importing: '',
  loading: false,
}

class GameStart extends React.Component<
  GameStartProps,
  typeof initGameStartState
  > {
  state = initGameStartState
  componentWillMount () {
    if (this.checkCachedWallet()) {
      this.setState({
        walletStatus: WalletStatus.CACHED,
      })
    }
  }
  public componentDidMount () {
    window.web3 = this.props.web3
    this.initUserContract()
    this.initWorldContract()
    this.initSceneOpContract()
    this.initUserOpContract()
  }

  private getIdentity = identityAddr => {
    window.identityContract = new this.props.web3.eth.Contract(
      identityAbi,
      identityAddr,
    )
    return window.identityContract
  }
  private handleInput = (key: string) => e => {
    const { value } = e.currentTarget
    this.setState(state =>
      Object.assign({ [key]: value, helperText: HelpText.NONE }),
    )
  }
  private handleKeyPress = (key: string) => (e: React.KeyboardEvent) => {
    if (key !== 'pwd') return
    if (this.state.walletStatus === WalletStatus.SAVING) {
      this.saveWallet()
    }
    if (e.keyCode === 13) {
      this.loadWallet()
    }
  }
  private checkCachedAccount = () => {}
  private checkCachedWallet = () => !!window.localStorage.getItem(walletKey)
  private loadWallet = () => {
    this.setState({ helperText: HelpText.UNLOCKING, loading: true })
    const wallet = this.props.web3.eth.accounts.wallet.load(
      this.state.pwd,
      walletKey,
    )
    if (wallet.length) {
      this.setState({ wallet, tabIndex: 0, helperText: HelpText.SUCCESS })
    } else {
      this.setState({ helperText: HelpText.NO_WALLET_FOUND })
    }
    this.setState({ loading: false })
  }
  private saveWallet = () => {
    this.setState({ helperText: HelpText.SAVING, loading: true })
    setTimeout(() => {
      this.props.web3.eth.accounts.wallet.save(this.state.pwd)
      this.setState({ helperText: HelpText.SUCCESS, loading: false })
    }, 0)
    // show success
  }
  private createWallet = () => {
    this.setState({ loading: true })
    const rnd = this.props.web3.utils.randomHex(32)
    const wallet = this.props.web3.eth.accounts.wallet.create(1, rnd)
    this.setState({ wallet, loading: false })
  }
  private importWallet = () => {
    this.setState({ helperText: HelpText.IMPORTING })
    window.localStorage.setItem(walletKey, this.state.importing)
    this.setState({ helperText: HelpText.SUCCESS, tabIndex: 1 })
  }

  private handleClick = (key: any) => e => {
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
        return this.saveWallet()
      }
      case LoginAction.IMPORT: {
        return this.importWallet()
      }
      default: {
        if ((key as any).address.startsWith('0x')) {
          this.setState({ selectedAccount: key })
        }
        return 'none'
      }
    }
  }
  private handleTabChange = (e, tabIndex) => {
    this.setState({ tabIndex })
  }
  private login = async () => {
    let identityAddr = ''
    this.setState({ loading: true })
    // set selected account
    window.account = this.state.selectedAccount
    const { address } = this.state.selectedAccount
    identityAddr = await this.checkAddr(address)
    console.log('identityAddr')
    console.log(identityAddr)
    if (identityAddr === ACCOUNT_NOT_EXIST) {
      const createRes: any = await this.createUser(address)
      const { topics } = createRes.result.logs[0]
      const [sig, contractAddr, publicAddr] = topics
      console.log('account address')
      console.log(window.account.address)
      console.log('public address')
      console.log(publicAddr)
      identityAddr = contractAddr
    }
    identityAddr =
      `${identityAddr}`.length === 42
        ? identityAddr
        : `0x${identityAddr.slice(26)}`
    window.identityAddr = identityAddr
    const contract = this.getIdentity(identityAddr)
    contract.methods
      .scene()
      .call()
      .then(mapId => {
        console.log(`goto${mapId}`)
        this.props.history.push(`/map/${mapId}`)
      })

    this.setState({ loading: false })
  }
  public createUser = async addr => {
    // NOTICE: GEN FUNCTION SIGNATURE
    // nervos web3
    // register.newId
    const fnSig = this.props.web3.eth.abi.encodeFunctionSignature(
      registerAbi[9],
    )

    // gen call data
    const params = this.props.web3.eth.abi.encodeParameters(['address'], [addr])
    const data = fnSig + params.slice(2)

    // gen tx
    /* eslint-disable */
    // const current = await this.props.web3.eth.getBlockNumber()
    // console.log(current)
    const tx = {
      data,
      to: window.userContract._address,
      from: window.account.address,
      privkey: window.account.privateKey,
      quota: 99999999,
      chainId: process.env.CHAIN_ID,
      nonce: Math.round(Math.random() * 10000),
    }
    /* eslint-enable */
    const sendTxResult: any = await this.props.web3.eth.sendTransaction(tx)
    if (sendTxResult.result.hash) {
      return getTxReceipt(this.props.web3)(sendTxResult.result.hash)
    }
    return console.error('Send Transaction Failed')
  }
  public checkAddr = addr => {
    console.log('check addr')
    return window.userContract.methods.idAddr(addr).call()
  }
  public initUserOpContract = async () => {
    const userOpAddr = await window.userContract.methods.userOpAddr().call()
    window.userOpContract = new this.props.web3.eth.Contract(
      userOpAbi,
      userOpAddr,
    )
  }
  private initWorldContract = async () => {
    const worldAddr = await window.userContract.methods.worldInfoAddr().call()
    window.worldContract = new this.props.web3.eth.Contract(worldAbi, worldAddr)
  }
  public initSceneOpContract = async () => {
    const sceneOpAddr = await window.userContract.methods.sceneOpAddr().call()
    window.sceneOpContract = new this.props.web3.eth.Contract(
      sceneOpAbi,
      sceneOpAddr,
    )
  }
  public initUserContract = () => {
    window.userContract = new this.props.web3.eth.Contract(
      registerAbi,
      contractInfo.registerAbi.addr,
    )
  }
  private PWDTextField = () => (
    <React.Fragment>
      <TextField
        value={this.state.pwd}
        onChange={this.handleInput('pwd')}
        type="password"
        label="Password"
        onKeyPress={this.handleKeyPress('pwd')}
        helperText={this.state.helperText}
        fullWidth
      />
    </React.Fragment>
  )
  private CurrentAccounts = accounts => (
    <List subheader={<li />}>
      <ListSubheader>Current Accounts</ListSubheader>
      {accounts.map(account => (
        <ListItem
          key={account.address}
          onClick={this.handleClick(account)}
          classes={{
            root: `${styles.account} ${
              this.state.selectedAccount.address === account.address
                ? styles.selected
                : ''
            }`,
          }}
        >
          <ListItemText
            classes={{ primary: styles.accountPrimary }}
            primary={account.address}
          />
        </ListItem>
      ))}
    </List>
  )
  private CurrentTab = accounts => {
    const { tabIndex } = this.state
    if (tabIndex === 0) {
      // login
      return <React.Fragment>{this.CurrentAccounts(accounts)}</React.Fragment>
    }
    if (tabIndex === 1) {
      // unlock
      return <React.Fragment>{this.PWDTextField()}</React.Fragment>
    }
    if (tabIndex === 2) {
      // save
      return <React.Fragment>{this.PWDTextField()}</React.Fragment>
    }
    if (tabIndex === 3) {
      // import
      return (
        <div>
          <TextField
            value={this.state.importing}
            onChange={this.handleInput('importing')}
            type="text"
            label="Wallet"
            onKeyPress={this.handleKeyPress('importing')}
            helperText={this.state.helperText}
            multiline
            rows={5}
            fullWidth
          />
        </div>
      )
    }
    return null
  }
  private CurrentActions = () => {
    const { tabIndex, selectedAccount } = this.state
    if (tabIndex === 0) {
      // login
      return (
        <React.Fragment>
          {selectedAccount.address ? (
            <Button onClick={this.handleClick(LoginAction.LOGIN)}>Login</Button>
          ) : null}
          <Button onClick={this.handleClick(LoginAction.CREATE)}>Create</Button>
        </React.Fragment>
      )
    }
    if (tabIndex === 1) {
      // unlock
      return (
        <React.Fragment>
          <Button onClick={this.handleClick(LoginAction.LOAD)}>Unlock</Button>
        </React.Fragment>
      )
    }
    if (tabIndex === 2) {
      // save
      return (
        <React.Fragment>
          <Button onClick={this.handleClick(LoginAction.SAVE)}>Save</Button>
        </React.Fragment>
      )
    }
    if (tabIndex === 3) {
      // import
      return (
        <React.Fragment>
          <Button onClick={this.handleClick(LoginAction.IMPORT)}>Import</Button>
        </React.Fragment>
      )
    }
    return null
  }
  private userContract: any
  private identityContract: any
  public render () {
    const { tabIndex, loading } = this.state
    const accounts = [
      ...new Set(
        Object.keys(this.state.wallet)
          .filter(key => key.startsWith('0x'))
          .map(key => this.state.wallet[key]),
      ),
    ]
    // console.log(accounts)

    return (
      <React.Fragment>
        <div
          className={commonStyles.bg}
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        />
        <Dialogue isOpen>
          {loading ? <LinearProgress /> : null}
          <DialogContent>
            <Tabs value={tabIndex} onChange={this.handleTabChange}>
              <Tab value={0} label="Login" />
              <Tab value={1} label="Unlock" />
              <Tab value={2} label="Save" />
              <Tab value={3} label="Import" />
            </Tabs>
            {this.CurrentTab(accounts)}
          </DialogContent>
          <DialogActions>{this.CurrentActions()}</DialogActions>
        </Dialogue>
      </React.Fragment>
    )
  }
}

export default withWeb3(hot(module)(GameStart))
