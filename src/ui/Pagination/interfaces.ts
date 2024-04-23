import { Dispatch } from 'react'

export interface Opts {
  limit: number
  page: number
  filter: string
}

export interface PaginationProps {
  count: number
  setOpts?: Dispatch<Opts>
  setOptsFilter?: Dispatch<{ url: string; opts: Opts }>
  url?: string
  opts: Opts
}
