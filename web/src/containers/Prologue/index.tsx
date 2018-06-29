import * as React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Icon,
} from '@material-ui/core'

import { withWeb3, WithWeb3 } from '../../contexts/web3'
import sceneAbi from '../../contracts/scene'
import userOpAbi from '../../contracts/userOp'
import sceneOpAbi from '../../contracts/sceneOp'
import getTxReceipt from '../../utils/getTxRecepts'

const commonStyles = require('../../styles/common.scss')
const bg = require('../../images/sauroDefeated.jpg')

enum Scene {
  NONE,
  TALK,
  FIGHT,
}

const initDrama = {
  mapId: '',
  messages: [],
  kind: 0,
  name: '',
  desc: '',
  step: 0,
  users: [],
}

const styles = require('./prologue.scss')

class Prologue extends React.Component<any, any> {
  state = initDrama
  public componentWillMount () {
    const { mapId } = this.props.match.params
    this.setState({ mapId })
  }
  public componentDidMount () {
    this.initSceneContract()
    this.loadInfo()
    this.loadType()
    this.loadDescription()
    this.loadName()
    this.loadUsers()
    this.setScene()
  }
  private setScene = async () => {
    const fnSig = this.props.web3.eth.abi.encodeFunctionSignature(userOpAbi[6])

    // gen call data
    const params = this.props.web3.eth.abi.encodeParameters(
      ['address'],
      [this.state.mapId],
    )
    const data = fnSig + params.slice(2)

    // gen tx
    /* eslint-disable */
    const tx = {
      data,
      to: window.userContract._address,
      from: window.account.address,
      privkey: window.account.privateKey,
      quota: 99999999,
      chainId: process.env.CHAIN_ID,
      nonce: 19999,
    }
    /* eslint-enable */
    const sendTxResult: any = await this.props.web3.eth.sendTransaction(tx)
    if (sendTxResult.result.hash) {
      console.log('send  setScene')
      return getTxReceipt(this.props.web3)(sendTxResult.result.hash)
    }
    return console.error('Send Transaction Failed')
  }
  private loadName = () => {
    window.sceneContract.methods
      .name()
      .call()
      .then(name => {
        this.setState({ name })
      })
  }
  private loadDescription = () => {
    window.sceneContract.methods
      .description()
      .call()
      .then(desc => {
        this.setState({ desc })
      })
  }
  private loadType = () => {
    window.sceneContract.methods
      .kind()
      .call()
      .then(type => {
        this.setState({ type })
      })
  }
  private loadInfo = () => {
    const { web3 } = this.props
    window.sceneContract.methods
      .info()
      .call()
      .then(msgs => {
        const messages = [
          ...new Set(msgs.map(msg => web3.utils.hexToAscii(msg))),
        ]
        this.setState({ messages })
      })
  }

  private initSceneContract () {
    window.sceneContract = new this.props.web3.eth.Contract(
      sceneAbi,
      this.state.mapId,
    )
  }

  private handleMsgClick = idx => async e => {
    const decision = idx - 1
    if (decision < 0) return

    const fnSig = this.props.web3.eth.abi.encodeFunctionSignature(sceneOpAbi[0])

    // gen call data
    // to, decision, scene
    const params = this.props.web3.eth.abi.encodeParameters(
      ['address', 'uint256', 'address'],
      [0, decision, this.state.mapId],
    )
    const data = fnSig + params.slice(2)

    // gen tx
    /* eslint-disable */
    const tx = {
      data,
      to: window.userContract._address,
      from: window.account.address,
      privkey: window.account.privateKey,
      quota: 99999999,
      chainId: process.env.CHAIN_ID,
      nonce: 19999,
    }
    const sendTxResult: any = await this.props.web3.eth.sendTransaction(tx)
    if (sendTxResult.result.hash) {
      return getTxReceipt(this.props.web3)(sendTxResult.result.hash)
    }
    return console.error('Send Transaction Failed')
    /* eslint-enable */
  }

  private nextMessage = e => {
    this.setState(state => {
      this.setState({ step: state.step + 1 })
    })
  }

  private loadUsers () {
    window.worldContract.methods
      .getUsers(this.state.mapId)
      .call()
      .then(users => {
        users.push(
          '0x6e65656420776561706f6e3f0000000000000000000000000000000000000000',
        )
        this.setState({ users })
      })
  }

  private fight = async (userAddr, decision) => {
    const fnSig = this.props.web3.eth.abi.encodeFunctionSignature(sceneOpAbi[0])

    // gen call data
    // to, decision, scene
    const params = this.props.web3.eth.abi.encodeParameters(
      ['address', 'uint256', 'address'],
      [userAddr, decision, this.state.mapId],
    )
    const data = fnSig + params.slice(2)

    // gen tx
    /* eslint-disable */
    const tx = {
      data,
      to: window.userContract._address,
      from: window.account.address,
      privkey: window.account.privateKey,
      quota: 99999999,
      chainId: process.env.CHAIN_ID,
      nonce: 19999,
    }
    /* eslint-enable */
    const sendTxResult: any = await this.props.web3.eth.sendTransaction(tx)
    if (sendTxResult.result.hash) {
      return getTxReceipt(this.props.web3)(sendTxResult.result.hash)
    }
    return console.error('Send Transaction Failed')
  }

  private userList = users => (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
        <Typography>Users</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List>
          {users.map(user => (
            <ListItem key={user}>
              <ListItemText primary={user} />
            </ListItem>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )

  public render () {
    const { messages, desc, step, users, name, type } = this.state
    console.log(type)
    return (
      <div
        className={commonStyles.bg}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        {name}
        {this.userList(users)}
        <div
          className={styles.desc}
          style={{
            display: `${step === 0 ? 'block' : 'none'}`,
          }}
          onClick={this.nextMessage}
        >
          {' '}
          {desc}
        </div>
        <div
          className={styles.messages}
          style={{
            display: `${step === 1 ? 'block' : 'none'}`,
          }}
        >
          {messages.map((msg, idx) => (
            <div key={msg} onClick={this.handleMsgClick(idx)}>
              {msg}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withWeb3(Prologue)
