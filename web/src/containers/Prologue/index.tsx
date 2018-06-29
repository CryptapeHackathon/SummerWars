import * as React from 'react'

const commonStyles = require('../../styles/common.scss')
const bg = require('../../images/sauroDefeated.jpg')

const initDrama = {}

class Prologue extends React.Component {
  state = initDrama

  render () {
    return (
      <div
        className={commonStyles.bg}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />
    )
  }
}

export default Prologue
