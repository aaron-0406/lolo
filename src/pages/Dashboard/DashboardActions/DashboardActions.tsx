import React, { useState } from 'react'
import ActionsSearch from './ActionsSearch/ActionsSearch'
import { Opts } from '../../../ui/Pagination/interfaces'

const DashboardActions = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [opts, setOpts] = useState<Opts>({ filter: '', limit: 50, page: 1 })
  const [chb, setChb] = useState<number>(0)

  const setLoadingGlobal = (state: boolean) => {
    setLoading(state)
  }

  const setChbGlobal = (chb: number) => {
    setChb(chb)
  }

  return (
    <ActionsSearch
      opts={opts}
      setOpts={setOpts}
      setLoadingGlobal={setLoadingGlobal}
      selectedBank={{ chb, setChb: setChbGlobal }}
    />
  )
}

export default DashboardActions
