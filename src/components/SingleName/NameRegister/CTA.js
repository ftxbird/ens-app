import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import cn from 'classnames'

import InsufficientBalanceModal from 'components/Modal/InsufficientBalanceModal'
import AnimationSpin from '../../AnimationSpin/index'

import { REGISTER } from 'graphql/mutations'
import { useAccount } from '../../QueryAccount'

import { startRegistering } from 'app/slices/registerSlice'

export const HOME_DATA = gql`
  query getHomeData($address: string) @client {
    network
    displayName(address: $address)
    isReadOnly
    isSafeApp
  }
`

const CTA = ({
  setCustomStep,
  duration,
  label,
  hasSufficientBalance,
  years,
  signature,
  connectHandler,
  setTransactionHash,
  isRegisterSuccess,
  successRegister,
  registering,
  setRegistering,
  paymentSuccess,
  freeDuration,
  index,
  canRegister,
}) => {
  const history = useHistory()
  const account = useAccount()
  const dispatch = useDispatch()
  const [showSufficientBalanceModal, setShowSufficientBalanceModal] =
    useState(false)

  useEffect(() => {
    if (isRegisterSuccess) {
      successRegister()
      setRegistering(false)
    }
  }, [isRegisterSuccess])

  const { data } = useQuery(HOME_DATA, {
    variables: {
      address: account,
    },
  })

  const { isReadOnly } = data

  const [mutationRegister] = useMutation(REGISTER, {
    onCompleted: (data) => {
      if (data?.register?.err) {
        setCustomStep('ERROR')
        errorRegistering()
        setRegistering(false)
      } else {
        setTransactionHash(data.register)
        paymentSuccess()
      }
    },
  })

  const goBack = () => {
    window.location.href = process.env.REACT_APP_AUCTION_WISHLIST_URL
  }

  const startRegisterFuc = () => {
    dispatch(startRegistering())
  }

  const registerHandle = () => {
    startRegisterFuc()
    setCustomStep('PENDING')
    setRegistering(true)
    const variables = {
      label,
      duration,
      signature,
      freeDuration,
      index,
    }
    mutationRegister({ variables })
  }

  return (
    <div className="flex items-end justify-between mt-8">
      {showSufficientBalanceModal && (
        <InsufficientBalanceModal
          closeModal={() => setShowSufficientBalanceModal(false)}
        />
      )}
      <div className="md:flex justify-between md:px-[48px] w-full">
        {isReadOnly ? (
          <button
            className="order-2 font-semibold mx-auto px-[37px] py-[9px] rounded-[16px] w-[160px] flex justify-center items-center bg-[#30DB9E]"
            onClick={connectHandler}
          >
            Connect
          </button>
        ) : (
          <button
            data-testid="request-register-button"
            disabled={isReadOnly || parseFloat(years) < 0.1 || !canRegister}
            onClick={async () => {
              if (hasSufficientBalance) {
                registerHandle()
              } else setShowSufficientBalanceModal(true)
            }}
            className={cn(
              'order-2 font-semibold mx-auto px-[37px] py-[9px] rounded-[16px] w-[160px] flex justify-center items-center',
              isReadOnly || parseFloat(years) < 0.1 || !canRegister
                ? 'bg-gray-800 text-white cursor-not-allowed'
                : 'bg-primary text-dark-common'
            )}
          >
            Register{' '}
            {registering && (
              <div className="ml-2">
                <AnimationSpin />
              </div>
            )}
          </button>
        )}

        <button
          onClick={goBack}
          className="order-1 mt-4 md:mt-0 mx-auto border-primary border text-primary font-semibold px-[37px] py-[9px] rounded-[16px] w-40 flex justify-center items-center"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default CTA
