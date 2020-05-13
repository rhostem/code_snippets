import React from 'react'
import { SWRConfig } from 'swr'
import API from 'api/axios'

export default function GlobalSWR({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) =>
          API.get(...args)
            .then((res) => res.data)
            .catch((err) => {
              console.error(err)
              return err
            }),
      }}
    >
      {children}
    </SWRConfig>
  )
}
