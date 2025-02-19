import React, { useState } from 'react'
import cn from 'classnames'

const tabData = ['domains', 'bids']

export default function Tab({ defaultValue, handleChange }) {
  const [inActive, setInActive] = useState(defaultValue ?? 0)
  return (
    <div
      className={cn(
        'w-full bg-[rgba(0,47,57,0.5)] rounded-[16px] py-2 px-[10px] grid gap-x-3',
        `grid-cols-${tabData.length}`
      )}
    >
      {tabData.map((item, index) => (
        <div
          onClick={() => {
            setInActive(index)
            handleChange(index)
          }}
          className={cn(
            'text-center text-[14px] py-2 cursor-pointer',
            index === inActive
              ? 'text-[#30DB9E] font-semibold bg-[#34606D] rounded-[12px]'
              : 'text-[#BDCED1]'
          )}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
