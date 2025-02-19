import React from 'react'

export default function AddNewButton({ clickHandle }) {
  return (
    <div
      className="w-full h-[56px] border border-[#B1D6D3] border-dashed rounded-[28px] flex justify-center items-center font-semibold text-[16px] text-white cursor-pointer"
      onClick={clickHandle}
    >
      + Add new
    </div>
  )
}
