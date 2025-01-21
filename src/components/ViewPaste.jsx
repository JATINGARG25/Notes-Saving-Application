import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const ViewPaste = () => {
  
  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes)
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input type='text' placeholder='Enter Title Here' value={paste.title} disabled 
        className='p-2 rounded-2xl mt-2 w-[66%] pl-4'></input>
      </div>
      <div className='mt-8'>
        <textarea value={paste.content} placeholder='Enter Content Here..' rows={20} disabled
        className='rounded-2xl mt-4 min-w-[500px] p-4'/>
      </div>
    </div>
  )
}

export default ViewPaste
