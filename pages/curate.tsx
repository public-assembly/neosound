import type { NextPage } from 'next'
import Head from 'next/head'
import { CurationInterface } from '@public-assembly/curation-interactions'
import { Connect } from '@/components/auth/Connect'

const Curate: NextPage = () => {
  return (
    <>
      <Head>
        <title>Curate</title>
        <meta name="description" content="Curate Neosound" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#ff89de]">
        <CurationInterface
          curationContractAddress={process.env.NEXT_PUBLIC_CURATION_CONTRACT}
          network={Number(process.env.NEXT_PUBLIC_CHAIN_ID)}
          connectButton={<Connect />}
        />
      </div>
    </>
  )
}

export default Curate
