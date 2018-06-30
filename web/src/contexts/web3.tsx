/* eslint-disable */
/// <reference path="../typings/react.d.ts" />
/* eslint-enable */
import * as React from 'react'
import NervosWeb3 from '@nervos/web3'

// export const initObservables: CITAObservables = new CITAObservables({
//   server:
//     window.localStorage.getItem('chainIp') || process.env.CITA_SERVER || '',
//   interval:
//     (process.env.OBSERVABLE_INTERVAL && +process.env.OBSERVABLE_INTERVAL) ||
//     1000,
// })
export const web3 = NervosWeb3(process.env.SERVER)
const Web3Context = React.createContext(web3)

/* eslint-disable no-use-before-define */
export interface WithWeb3 {
  web3: typeof web3
}
/* eslint-enable no-use-before-define */

export const withWeb3 = Comp => props => (
  <Web3Context.Consumer>
    {web3ins => <Comp {...props} web3={web3ins} />}
  </Web3Context.Consumer>
)
export const Web3Provider = Comp => props => (
  <Web3Context.Provider value={web3}>
    <Comp {...props} />
  </Web3Context.Provider>
)

export default Web3Context
