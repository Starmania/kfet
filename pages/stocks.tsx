import Head from 'next/head'
import { withAuthentication } from '../components/withAuthentication'
import type { NextPage } from 'next'

const Stocks: NextPage = () => {
  return (
    <>
      <Head>
        <title>MEGA KFET - Stocks</title>
        <meta name="description" content="Gestion des stocks de la MEGA KFET" />
      </Head>
      <div className="container grow flex flex-col justify-center items-center">
        <div className="mt-8 grid grid-cols-2 gap-4 justify-items-center">
          Todo
        </div>
      </div>
    </>
  )
}

export default withAuthentication(Stocks)
