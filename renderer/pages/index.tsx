import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Box } from '@mui/material'

const HomePage = () => {
  const [message, setMessage] = React.useState('No message found')

  useEffect(() => {
    window.ipc.on('message', (message: string) => {
      setMessage(message)
    })
  }, [])

  return (
    <Box>
      <Head>
        <title className="text-blue-700 p-5">
          Home - Nextron (basic-lang-typescript)
        </title>
      </Head>
      <div>
        <p className="bg-red-500">
          ⚡ Electron + Next.js ⚡ -<Link href="/survey">Go to next page</Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width={256}
          height={256}
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={() => {
            window.ipc.send('message', 'Hello')
          }}
        >
          Test IPC
        </button>
        <p>{message}</p>
      </div>
    </Box>
  )
}

export default HomePage
