import { useRef, useState } from 'react'

import { MySwipper } from '@/components/atoms/MySwipper'
import { ProductCard } from '@/components/organisms/ProductCard'

const productCards = [
  {
    title: '200',
    subTitle: '200 Real Instagram Likes',
    reviewCount: 0,
    cost: 6.99,
    isPopular: false,
  },
  {
    title: '1500',
    subTitle: '1500 Real Instagram Likes',
    reviewCount: 0,
    cost: 19.99,
    isPopular: false,
  },
  {
    title: '3000',
    subTitle: '3000 Real Instagram Likes',
    reviewCount: 0,
    cost: 34.99,
    isPopular: true,
  },
  {
    title: '8000',
    subTitle: '8000 Instagram Likes',
    avgMark: 5,
    reviewCount: 0,
    cost: 79.99,
    isPopular: false,
  },
]

export const ActiveLikes: React.VFC = () => {
  const swiperRef = useRef<any>(null)
  const prevRef = useRef<any>(null)
  const nextRef = useRef<any>(null)
  // const [swiperCurrentIndex, setSwiperCurrentIndex] = useState(0)
  const [swiperReachStarted, setSwiperReachStarted] = useState(0)
  const [swiperReachEnded, setSwiperReachEnded] = useState(0)
  const prevClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    prevRef.current?.click()
  }
  const nextClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    nextRef.current?.click()
  }

  const swiperIndexChange = (e: any) => {}

  const swiperReachStart = (e: any) => {
    setSwiperReachStarted(e)
  }

  const swiperReachEnd = (e: any) => {
    setSwiperReachEnded(e)
  }
  return (
    <>
      <div className="flex flex-row space-x-8 justify-center flex-nowrap">
        <div className="flex w-[30px] items-center">
          <span
            ref={prevRef}
            className={
              !swiperReachStarted
                ? 'rounded-full bg-[purple] hover:cursor-pointer p-1'
                : 'rounded-full bg-gray-500 mt-[2px] hover:cursor-pointer p-1'
            }
            onClick={prevClick}
          >
            <svg
              className="h-8 w-8 text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <path stroke="none" d="M0 0h24v24H0z" />{' '}
              <line x1="5" y1="12" x2="19" y2="12" />{' '}
              <line x1="5" y1="12" x2="11" y2="18" />{' '}
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
          </span>
        </div>
        <div className="flex w-[30px] items-center hover:cursor-pointer">
          <span
            ref={nextRef}
            className={
              !swiperReachEnded
                ? 'rounded-full bg-[purple] p-1'
                : 'rounded-full bg-gray-500 mt-[2px] p-1'
            }
            onClick={nextClick}
          >
            <svg
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <line x1="5" y1="12" x2="19" y2="12" />{' '}
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
      <div className="h-0 md:h-3"></div>
      <MySwipper
        ref={swiperRef}
        prevRef={prevRef}
        nextRef={nextRef}
        activeIndexChange={swiperIndexChange}
        swiperReachStart={swiperReachStart}
        swiperReachEnd={swiperReachEnd}
      >
        {productCards.map((item, id) => {
          return (
            <ProductCard
              key={id}
              title={item.title}
              subTitle={item.subTitle}
              reviewCount={item.reviewCount}
              cost={item.cost}
              isPopular={item.isPopular}
            />
          )
        })}
      </MySwipper>
    </>
  )
}