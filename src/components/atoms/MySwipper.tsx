type Props = {
  readonly children: ReadonlyArray<Object>
  readonly prevRef: any
  readonly nextRef: any
  readonly activeIndexChange: any
  readonly swiperReachStart: any
  readonly swiperReachEnd: any
}

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import React, { ForwardRefRenderFunction, useEffect, useState } from 'react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const MyComponentRenderFn: ForwardRefRenderFunction<any, Props> = (
  {
    children,
    prevRef,
    nextRef,
    activeIndexChange,
    swiperReachStart,
    swiperReachEnd,
  },
  ref,
) => {
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    const swiper = document.querySelector('.swiper')?.swiper
    setActiveIndex(swiper.activeIndex)
  }, [])

  useEffect(() => {
    if (activeIndex === 0) swiperReachStart()
    const swiper = document.querySelector('.swiper')?.swiper
    if (swiper.isEnd) swiperReachEnd(1)
    else swiperReachEnd(0)
    if (swiper.isBeginning) swiperReachStart(1)
    else swiperReachStart(0)
  }, [activeIndex])

  const nextSlide = () => {
    const swiper = document.querySelector('.swiper')?.swiper
    swiper.slideNext()
  }
  const prevSlide = () => {
    const swiper = document.querySelector('.swiper')?.swiper
    swiper.slidePrev()
  }

  return (
    <Swiper
      className="flex w-full min-h-screen justify-center items-center"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      breakpoints={{
        // when window width is >= 640px
        640: {
          width: 640,
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 2,
        },
        // when window width is >= 768px
        1024: {
          width: 1024,
          slidesPerView: 3,
        },
        1280: {
          width: 1280,
          slidesPerView: 4,
        },
      }}
      navigation={{
        prevEl: prevRef.current ? prevRef.current : undefined,
        nextEl: nextRef.current ? nextRef.current : undefined,
      }}
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(e) => setActiveIndex(e.activeIndex)}
      onReachBeginning={swiperReachStart}
      onReachEnd={swiperReachEnd}
    >
      {children
        ? children.map((slideContent, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <div className="flex px-10 justify-center">{slideContent}</div>
            </SwiperSlide>
          ))
        : null}{' '}
      <div data-toggle="prev" ref={prevRef} onClick={(e) => prevSlide()}></div>
      <div data-toggle="next" ref={nextRef} onClick={(e) => nextSlide()}></div>
    </Swiper>
  )
}

export const MySwipper = React.forwardRef(MyComponentRenderFn)

// export const MySwipper: React.FC<Props> = ({ children }) => {
//   const nextSlide = () => {
//     console.log('Next Slide')
//   }
//   const prevSlide = () => {
//     console.log('Prev Slide')
//   }
//   return (
//     <Swiper
//       className="flex w-full"
//       modules={[Navigation, Pagination, Scrollbar, A11y]}
//       spaceBetween={10}
//       slidesPerView={3}
//       navigation
//       pagination={{ clickable: true }}
//       // scrollbar={{ draggable: true }}
//       onSwiper={(swiper) => console.log(swiper)}
//       onSlideChange={(e) => console.log('slide change => ', e)}
//     >
//       {children
//         ? children.map((slideContent, index) => (
//             <SwiperSlide key={index} virtualIndex={index}>
//               <div className="flex px-10 justify-center">{slideContent}</div>
//             </SwiperSlide>
//           ))
//         : null}{' '}
//     </Swiper>
//   )
// }