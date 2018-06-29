import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import worldAbi from '../../contracts/world'
import sceneAbi from '../../contracts/scene'

import { withWeb3, WithWeb3 } from '../../contexts/web3'

const commmonStyles = require('../../styles/common.scss')
const styles = require('./map.scss')
const mapImg = require('../../images/map.jpg')
const locationsImg = require('../../images/locations.png')

const initState = {
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
    this.initWorldContract()
    this.loadScenes()
  }
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

  render () {
    return (
      <div className={commmonStyles.bg}>
        {this.dropPoints()}
        <img src={mapImg} alt="map" className={styles.map} />
      </div>
    )
  }
}

export default withWeb3(Map)
