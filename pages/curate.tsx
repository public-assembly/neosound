import type { NextPage } from 'next'
import { CurationInterface } from '@public-assembly/curation-interactions'
import { Connect } from '@/components/auth/Connect'
import { Seo } from '@/components/Seo'

const Curate: NextPage = () => {
  return (
    <>
      <Seo title="Curate" description="Curate Neosound" />
      <div className="curation-interface bg-[#ff89de]">
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
