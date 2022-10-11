import type { NextPage } from 'next'
import Head from 'next/head'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About Neosound" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" flex flex-col items-start justify-between gap-4 whitespace-pre-wrap px-6 text-stone-200 sm:px-12 md:max-w-4xl">
        <h1 className="my-4 text-3xl font-light text-stone-300">Neosound</h1>
        <h1 className="text-xl font-light text-stone-300 sm:text-2xl">
          This site offers a new way to listen, share, and publish music on the internet.
          Built upon modular + open-source building blocks, Neosound will serve as a
          living reference for others to draw inspiration, learn, and remix for their own
          communities and audiences{' '}
        </h1>

        <h1 className="text-xl font-light text-stone-300 sm:text-2xl">
          Combining the concepts of the microplatform, community-driven curation, and art
          focused consumption experiences, this project is a direct synthesis of Unun,
          Present Material, and Door. It is a template to help others create what’s
          missing.
        </h1>
      </div>
    </>
  )
}

export default About
