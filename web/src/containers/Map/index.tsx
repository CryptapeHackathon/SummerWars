import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

const commmonStyles = require('../../styles/common.scss')
const styles = require('./map.scss')
const mapImg = require('../../images/map.jpg')
const locationsImg = require('../../images/locations.png')

const initState = {
  points: [
    { name: 'name', url: '/url', x: '100px', y: '200px', bgPosition: '0 0' },
    {
      name: 'name1',
      url: '/prologue',
      x: '140px',
      y: '300px',
      bgPosition: '0 165px',
    },
    {
      name: 'name2',
      url: '/prologue',
      x: '400px',
      y: '100px',
      bgPosition: '165px 0',
    },
    {
      name: 'name3',
      url: '/prologue',
      x: '800px',
      y: '800px',
      bgPosition: '0 330px',
    },
  ],
}
type MapState = typeof initState
interface MapProps {}
class Map extends React.Component<RouteComponentProps<MapProps>, MapState> {
  state = initState
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
        {/*
        <img src={locationsImg} />
      */}
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

export default Map
