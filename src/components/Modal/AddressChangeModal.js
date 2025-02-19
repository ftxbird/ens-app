//Import packages
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { ethers } from '../../ui'
import cn from 'classnames'

//Import components
import Modal from './Modal'

export default function AddressChangeModal({ show, closeModal, saveHandler }) {
  const formik = useFormik({
    initialValues: {
      address: ''
    },
    validate: async values => {
      const errors = {}
      if (!ethers.utils.isAddress(values.address)) {
        errors.address = 'Address is not valid.'
      }
      return errors
    },
    onSubmit: values => {
      saveHandler(values)
    }
  })

  useEffect(() => {
    formik.resetForm()
  }, [show])

  return (
    <div>
      {show && (
        <Modal
          width="380px"
          showingCrossIcon={true}
          className="pt-[34px] pb-[36px] px-[40px]"
          closeModal={closeModal}
          cannotCloseFromOutside={true}
        >
          <div className="text-white font-bold text-[28px] text-center">
            Edit Address
          </div>
          <div className="mt-4">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="text-white font-semibold">
                  Address<span className="text-red-800">*</span>
                </div>
                <input
                  className="w-full bg-[rgba(72,143,139,0.25)] rounded-[12px] text-[#7E9195] text-[14px] py-[7px] px-4 focus:outline-0"
                  placeholder="Enter the address"
                  id="address"
                  name="address"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.errors.address ? (
                  <div className="text-[#ED7E17] text-[12px] m-1">
                    {formik.errors.address}
                  </div>
                ) : null}
              </div>
              <div className="text-[#BCC2D1] text-[14px] mt-4">
                <span className="text-red-800">*</span>Required field must be
                filled in.
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className={cn(
                    'w-[160px] rounded-[16px] h-[38px] flex justify-center items-center font-semibold',
                    formik.isValid
                      ? 'bg-[#30DB9E] text-[#134757]'
                      : 'bg-[#7E9195] text-white'
                  )}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}
