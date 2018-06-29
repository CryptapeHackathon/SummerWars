import * as React from 'react'

declare module 'React' {
  type Provider < T > = React.ComponentType<{
    value: T
    children?: React.ReactNode
  }>

  type Consumer < T > = React.ComponentType<{
    children: (value: T) => React.ReactNode
  }>

  interface Context<T> {
    Provider: Provider<T>
    Consumer: Consumer<T>
  }

  function createContext<T>(
    defaultValue: T,
    calculateChangedBits?: (prev: T, next: T) => number,
  ): Context<T>
}

declare global {
  interface Window {
    account: any
    userContract: any
    sceneContract: any
    identityContract: any
    worldContract: any
    sceneOpContract: any
    userOpContract: any
    citaWeb3: any
    web3: any
    identityAddr: string
  }
}
