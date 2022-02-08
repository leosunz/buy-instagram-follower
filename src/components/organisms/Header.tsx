type Props = {}
import React, { useEffect, useState } from 'react'

import { Image } from '@/components/atoms/Image'
const urlPrefix = 'https://localhost:3000'

export const Header: React.VFC<Props> = () => {
  const [stickyClass, setStickyClass] = useState('nav w-full relative')

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar)

    return () => {
      window.removeEventListener('scroll', stickNavbar)
    }
  }, [])

  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY
      windowHeight > 0
        ? setStickyClass('nav w-full left-0 z-50 sticky')
        : setStickyClass('nav w-full relative')
    }
  }

  return (
    <nav className={`${stickyClass}`}>
      <div className="min-w-min py-5 flex flex-wrap justify-between items-center mx-auto bg-black md:bg-transparent">
        <div className="ml-1 ls:ml-5 sm:ml-16">
          <Image src="/Goreadlogo.png" width={190} height={40} alt="Logo" />
        </div>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className="inline-flex items-center p-6 ml-3 text-sm text-gray-500 rounded-lg md:hidden  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto h-screen md:h-auto"
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-0 ml:space-x-1 md:mt-0 text-base md:font-medium">
            <li>
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li className="w-full md:w-28 ml:w-28 lg:w-36">
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Buy Intagram Followers
              </a>
            </li>
            <li className="w-full md:w-28 ml:w-28 lg:w-36">
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Buy Instagram Likes
              </a>
            </li>
            <li className="w-full md:w-28 ml:w-28 lg:w-36">
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Buy Instagram Views
              </a>
            </li>
            <li className="block md:hidden w-full dm:block md:w-24 ml:w-28">
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white border-b hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:w-28"
              >
                Other Services
              </a>
            </li>
            <li className="hidden md:block md:w-16 xl:hidden dropdown">
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white border-b hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:w-18"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <div className="dropdown-content">
                <div className="dm:hidden">
                  <a href="#">Other Services</a>
                </div>
                <a href="#">Blog</a>
                <a href="#">FAQ</a>
                <a href="#">Contact</a>
              </div>
            </li>
            <li className="block md:hidden xl:block xl:w-16 pt-3">
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white border-b hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Blog
              </a>
            </li>
            <li className="block md:hidden xl:block xl:w-16 pt-3">
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white border-b hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                FAQ
              </a>
            </li>
            <li className="block md:hidden xl:block xl:w-24 pt-3">
              <a
                href="#"
                className="flex items-center h-full py-2 pr-4 pl-3 text-white border-b hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <script src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"></script>

    </nav>
  )
}

export default { args: {} }
