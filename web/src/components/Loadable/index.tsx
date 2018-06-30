import * as React from 'react'
import * as L from 'react-loadable'
import LoadingPage from '../LoadingPage'

const Loadable = (opts: any) =>
  L({
    loading: () => <LoadingPage />,
    delay: 300,
    ...opts,
  })

export default Loadable
