import Heading from '@/dls/Heading'
import IconWrapper from '@/dls/IconWrapper'
import ClipboardIcon from '@/icons/ClipboardIcon'
import React from 'react'

type Props = {}

// TODO: Refactor this component

const ProfilePage = (props: Props) => {
  return (
    <div className='mt-5'>
      <Heading>Informasi tentang akun</Heading>
      <div className='p-5 bg-white rounded-2xl flex flex-col gap-3 mt-4'>
        <div className='flex  lg:flex-row flex-col lg:items-center'>
          <span className='w-[18%] font-semibold'>Email</span>
          <span className='lg:ml-0 ml-3'>personalemail@gmail.com</span>
        </div>
        <div className='flex lg:flex-row flex-col lg:items-center'>
          <span className='w-[18%] font-semibold'>Password</span>
          <span className='lg:ml-0 ml-3'>**********</span>
        </div>
        <span className='flex lg:flex-row flex-col lg:items-center'>
          <span className='w-[18%] font-semibold whitespace-nowrap flex items-center gap-2'>
            <span>Token Telegram</span>
            <IconWrapper className='w-5'>
              <ClipboardIcon />
            </IconWrapper>
          </span>
          <span className='lg:ml-0 ml-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, ullam!</span>
        </span>
      </div>
    </div>
  )
}

export default ProfilePage