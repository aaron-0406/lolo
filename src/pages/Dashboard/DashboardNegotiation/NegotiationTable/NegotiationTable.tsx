import { Dispatch, FC, useState, useEffect } from 'react'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'

type NegotiationTableType = {
  opts: Opts
  setOpts: Dispatch<Opts>
  loading: boolean
  setLoadingGlobal: (state: boolean) => void
}

const NegotiationTable = ({ opts, setOpts, loading, setLoadingGlobal }: NegotiationTableType) => {

    return(<></>)
}

export default NegotiationTable
