import React, { Suspense } from 'react'
import SetPasswordForm from './_components/set-password-form'

const SetPasswordPage = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
        <Suspense fallback={<div>loading...</div>}>
          <SetPasswordForm/>
        </Suspense>
    </div>
  )
}

export default SetPasswordPage