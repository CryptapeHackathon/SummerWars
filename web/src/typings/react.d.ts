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
