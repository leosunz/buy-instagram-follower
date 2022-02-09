import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Header } from '@/components/organisms/Header'
import type { SideProps } from '@/components/organisms/SideNavbar'
import styles from '@/styles/css/Home.module.css'

const SideNavbar = dynamic<SideProps>(() =>
  import('../components/organisms/SideNavbar').then((mod) => mod.SideNavbar),
)

export default function Home() {
  const [navShown, setNavShown] = useState(false)

  const menuClick = () => {
    setNavShown(!navShown)
  }
  return (
    <div className={styles['container']}>
      <Head>
        <title>
          Buy Instagram Followers and Likes starting at $0.89 - goread.io
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menuClick={menuClick} navShown={() => navShown} />
      {navShown ? <SideNavbar>abc</SideNavbar> : <div></div>}

      <main className="flex flex-1 flex-col justify-center items-center absolute w-full top-0 min-h-screen p-0">
        <div className="w-full">
          <div className="w-full">
            <div className="ml-auto w-8/12">
              <img src="/home-banner.png" alt="bannerImage" width="100%" />
            </div>
          </div>
          <div className="flex flex-col px-20 pt-10 z-[20] md:pt-0 md:absolute md:top-64 dm:top-56">
            <div className="flex-none w-full md:w-5/12 md:h-auto">
              <h1 className="text-4xl font-medium">
                <span className="text-[#25AAE1]">Super Real Instagram </span>
                <span>followers,likes,power likes,</span>
                <span>views,comments,saves </span>
                <span className="text-[#f15d23]">in Minutes</span>
              </h1>
              <br></br>
            </div>
            <p className="flex w-full ml:w-8/12 ml:h-42 mx:w-6/12 mx:h-48 lg:w-5/12 lg:h-36">
              Instagram is one of the best social media platforms to reach
              millions of followers. Buying active and real Instagram increase
              increase your network of followers naturally. naturally.
              naturally. Not only this but you will also save your precious time
              time and get the job done in an effortless manner.
            </p>
            <div className="flex flex-wrap mt-10 px-2 flex-col space-y-2 md:flex-row w-full md:space-x-1 md:space-y-0 lg:px-0">
              <button className="flex justify-center text-white bg-[#25AAE1] px-3 py-2 rounded-3xl hover:text-white hover:bg-[#F15D23] transition-all">
                Buy Instagram Followers
              </button>
              <button className="flex justify-center text-white bg-[#25AAE1] px-3 py-2 rounded-3xl hover:text-white hover:bg-[#F15D23] transition-all">
                Buy Instagram Likes
              </button>
              <button className="flex justify-center text-white bg-[#25AAE1] px-3 py-2 rounded-3xl hover:text-white hover:bg-[#F15D23] transition-all">
                Buy Instagram Views
              </button>
            </div>
          </div>
        </div>
        <div className="flex mt-10 md:m-32 md:flex">
          <div className={styles['grid']}>
            <a href="https://nextjs.org/docs" className={styles['card']}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles['card']}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles['card']}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles['card']}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </div>
      </main>

      <footer className={styles['footer']}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer>
    </div>
  )
}
