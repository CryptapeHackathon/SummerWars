import * as React from 'react'
import { Button, TextField } from '@material-ui/core'
import worldAbi from '../../contracts/world'
import sceneAbi from '../../contracts/scene'
import registerAbi from '../../contracts/register'
import getTxReceipt from '../../utils/getTxRecepts'

import { withWeb3, WithWeb3 } from '../../contexts/web3'

const commmonStyles = require('../../styles/common.scss')
const styles = require('./map.scss')
const mapImg = require('../../images/map.jpg')
const locationsImg = require('../../images/locations.png')

const initState = {
  name: '',
  points: [
    { name: 'name', url: '/url', x: '100px', y: '200px', bgPosition: '0 0' },
    {
      name: 'name1',
      url: '/map/0x0000000000000000000000000000000000000000',
      x: '1040px',
      y: '300px',
      bgPosition: '0 165px',
    },
    {
      name: 'name2',
      url: '/map/0x0000000000000000000000000000000000000000',
      x: '400px',
      y: '100px',
      bgPosition: '165px 0',
    },
    {
      name: 'name3',
      url: '/map/0x0000000000000000000000000000000000000000',
      x: '800px',
      y: '800px',
      bgPosition: '0 330px',
    },
  ],
}
type MapState = typeof initState
/* eslint-disable no-restricted-globals */
interface MapProps extends WithWeb3 {
  history: any
}
/* eslint-enable no-restricted-globals */
class Map extends React.Component<MapProps, MapState> {
  state = initState
  public componentWillMount () {
    if (!window.account) {
      this.props.history.push('/')
    }
    this.initWorldContract()
    this.loadScenes()
  }
  // public componentDidMount() {
  //   this.interval(() => {
  //     this.loadScenes()
  //   }, 3000)
  // }
  // public componentWillUnmount() {
  //   clearInterval(this.interval)
  // }
  private initWorldContract = async () => {
    const worldAddr = await window.userContract.methods.worldInfoAddr().call()
    window.worldContract = new this.props.web3.eth.Contract(worldAbi, worldAddr)
  }
  private loadScenes = async () => {
    if (window.worldContract) {
      window.worldContract.methods
        .scenes(0)
        .call()
        .then(point => this.loadPoint(point))
      window.worldContract.methods
        .scenes(1)
        .call()
        .then(point => this.loadPoint(point))
    }
  }
  private loadPoint = async point => {
    const sceneContract = new this.props.web3.eth.Contract(sceneAbi, point)
    const location = await sceneContract.methods.location().call()
    const name = await sceneContract.methods.name().call()
    const p = {
      url: `/map/${point}`,
      name,
      x: `${location.x * 100}px`,
      y: `${location.y * 100}px`,
      bgPosition: '0 165px',
    }
    this.setState(state => ({
      points: [...state.points, p],
    }))
  }
  private handleInput = e => {
    const { value } = e.currentTarget
    this.setState({ name: value })
  }
  private navTo = url => e => {
    this.props.history.push(url)
  }
  private dropPoints = () => {
    const { points } = this.state
    return points.map(point => (
      <div
        key={point.name}
        className={styles.point}
        style={{
          top: point.y,
          left: point.x,
          backgroundImage: `url(${locationsImg})`,
          backgroundPosition: point.bgPosition,
          backgroundSize: '500px',
        }}
        onClick={this.navTo(point.url)}
      >
        <span>{point.name}</span>
      </div>
    ))
  }
  private addNewScene = async () => {
    const fnSig = this.props.web3.eth.abi.encodeFunctionSignature(
      registerAbi[7],
    )

    // gen call data
    // storage
    const storyAddr = await window.userContract.methods.firstStoryAddr().call()
    const params = this.props.web3.eth.abi.encodeParameters(
      ['address', 'string', 'address'],
      [window.account.address, this.state.name, storyAddr],
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
      nonce: Math.round(Math.random() * 10000),
    }
    /* eslint-enable */
    const sendTxResult: any = await this.props.web3.eth.sendTransaction(tx)
    if (sendTxResult.result.hash) {
      return getTxReceipt(this.props.web3)(sendTxResult.result.hash)
    }
    return console.error('Send Transaction Failed')
  }
  // private interval: any
  render () {
    return (
      <div className={commmonStyles.bg}>
        {this.dropPoints()}
        <section className={styles.add}>
          <TextField
            value={this.state.name}
            onChange={this.handleInput}
            label="New Scene"
          />
          <Button onClick={this.addNewScene}>Add Scene</Button>
        </section>
        <img src={mapImg} alt="map" className={styles.map} />
      </div>
    )
  }
}

export default withWeb3(Map)
