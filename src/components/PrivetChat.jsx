import React from 'react'
import { useParams } from 'react-router-dom'
import MessageBox from './MessageBox'

const PrivetChat = () => {
    const { name } = useParams()
  return (
    <div className='section-2'>
        PrivetChat
        <div className='d-flex bg-grey-600'>
            {name && name}
        </div>
        <MessageBox/>
    </div>
  )
}

export default PrivetChat