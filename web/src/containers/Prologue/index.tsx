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
import Battle from '../../components/Battle'

import UserStatus from '../UserStatus'
import { withWeb3, WithWeb3 } from '../../contexts/web3'
import sceneAbi from '../../contracts/scene'
import userOpAbi from '../../contracts/userOp'
import sceneOpAbi from '../../contracts/sceneOp'
import identityAbi from '../../contracts/identity'
import getTxReceipt from '../../utils/getTxRecepts'
import sign from '../../utils/sign'

// const formatter = require('cita-web3/lib/web3/formatters')

const commonStyles = require('../../styles/common.scss')
const firstBg = require('../../images/first.jpg')
const fightBg = require('../../images/fight.gif')

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
  type: Scene.NONE,
  battleOn: false,
  target: '',
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
    // userOp.setScene
    // const fnSig = this.props.web3.eth.abi.encodeFunctionSignature(userOpAbi[2])
    const fnSig = this.props.web3.eth.abi.encodeFunctionSignature(
      identityAbi[5],
    )

    // gen call data
    const params = this.props.web3.eth.abi.encodeParameters(
      ['address', 'address'],
      [this.state.mapId, window.identityAddr],
    )
    const data = fnSig + params.slice(2)

    // gen tx
    const current = await this.props.web3.eth.getBlockNumber()
    console.log(current)
    /* eslint-disable */
    const tx = {
      data,
      to: window.userContract._address,
      from: window.account.address,
      privkey: window.account.privateKey,
      quota: 99999999,
      chainId: process.env.CHAIN_ID,
      nonce: 19999,
      validUntilBlock: +current.result + 88,
    }
    /* eslint-enable */
    console.log(tx)
    const signedData = sign(tx)
    const sendTxResult: any = await this.props.web3.eth.sendSignedTransaction(
      `0x${signedData}`,
    )
    // const sendTxResult: any = await this.props.web3.eth.sendTransaction(tx)
    if (sendTxResult.result.hash) {
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
        ].filter(msg => msg)
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

    // sceneOp.process
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
        users.push('0xb469719c7C04563ec17dFa9a34Da4FC0dcce002B')
        this.setState({ users })
      })
  }

  private fight = async (userAddr, decision) => {
    // sceneOp.process
    const fnSig = this.props.web3.eth.abi.encodeFunctionSignature(sceneOpAbi[0])

    // gen call data
    // to, decision, scene
    const params = this.props.web3.eth.abi.encodeParameters(
      ['address', 'uint256', 'address'],
      [userAddr, decision, this.state.mapId],
    )
    const data = fnSig + params.slice(2)
    const current = await this.props.web3.eth.getBlockNumber()

    // gen tx
    /* eslint-disable */
    const tx = {
      data,
      to: window.userContract._address,
      from: window.account.address,
      privkey: window.account.privateKey,
      quota: 99999999,
      chainId: process.env.CHAIN_ID,
      nonce: 'adsfasdf',
      validUntilBlock: +current.result + 88,
    }

    // show battle
    this.setState({ battleOn: true })
    // show battle

    /* eslint-enable */
    const signedData = sign(tx)
    const sendTxResult: any = await this.props.web3.eth.sendSignedTransaction(
      `0x${signedData}`,
    )
    // const sendTxResult: any = await this.props.web3.eth.sendTransaction(tx)
    if (sendTxResult.result.hash) {
      this.setState({ battleOn: true, target: userAddr })
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
    const {
      messages,
      desc,
      step,
      users,
      name,
      type,
      battleOn,
      target,
    } = this.state
    return (
      <div
        className={commonStyles.bg}
        style={{
          backgroundImage: `url(${type === 2 ? firstBg : fightBg})`,
        }}
      >
        <UserStatus
          history={this.props.history}
          positionName={name}
          users={users}
          fight={this.fight}
        />
        <div
          className={styles.desc}
          style={{ display: `${step === 0 ? 'block' : 'none'}` }}
          onClick={this.nextMessage}
        >
          {' '}
          {desc}
        </div>
        <div
          className={styles.messages}
          style={{ display: `${step === 1 ? 'block' : 'none'}` }}
        >
          {messages.map((msg, idx) => (
            <div key={msg} onClick={this.handleMsgClick(idx)}>
              {msg}
            </div>
          ))}
        </div>
        {battleOn ? (
          <Battle
            user1={window.account.address}
            user2={target}
            battleOn={battleOn}
            closeBattle={() => this.setState({ battleOn: false })}
          />
        ) : null}
      </div>
    )
  }
}

export default withWeb3(Prologue)
