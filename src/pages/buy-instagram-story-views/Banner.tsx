import { useState } from 'react'

import { Plans } from './Plans'

// type Props = {
//   readonly onClickedHighQuality: () => void
//   readonly onClickedActiveViews: () => void
//   readonly viewType: () => string
// }

type Props = {
  readonly onPlanSelected: (any) => void
}

export const Banner: React.VFC<Props> = (props) => {
  return (
    <div className="flex flex-col flex-wrap w-full bg-[#222232] min-h-screen">
      <div className="flex flex-col flex-wrap p-16 space-y-3 justify-center">
        <div className="text-white text-4xl text-center">
          <span>
            <span className="">Buy Instagram Story Views</span> with Instant
            Delivery in 2020
          </span>
        </div>
        <div className="text-white text-1xl text-center">
          <span>
            <span>
              Select a package that you like and submit Order Now button
            </span>
          </span>
        </div>
        <div className="text-white text-2xl text-center">
          <span className="text-lg">★★★★★</span> (1 Reviews)
        </div>
      </div>
      <div className="flex w-full flex-col flex-wrap px-5 md:px-16 space-y-5 justify-center items-center">
        <div className="h-10"></div>
        <div className="w-full justify-center items-center mt-16">
          <Plans onPlanSelected={(item) => props.onPlanSelected(item)} />
        </div>
      </div>
    </div>
  )
}