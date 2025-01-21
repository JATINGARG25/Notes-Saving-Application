import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setsearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId")

    const allPastes = useSelector((state) => state.paste.pastes)
    const dispatch = useDispatch();

    useEffect(() => {
        if(pasteId){
            const paste = allPastes.find((p) => p._id === pasteId)
            setTitle(paste.title)
            setValue(paste.content)
        }
    },[pasteId])
    
    function createPaste(){
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString()
        }

        if(pasteId){
            // update
            dispatch(updateToPastes(paste));
        }
        else{
            // create
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setsearchParams({});
    }

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input type='text' placeholder='Enter Title Here' 
                value={title} onChange={(e) => setTitle(e.target.value)}
                className='p-2 rounded-2xl mt-2 w-[66%] pl-4'></input>
                <button className='p-2 rounded-2xl mt-2'
                onClick={createPaste}>{pasteId ? "Update Paste" : "Create My Paste"}</button>
            </div>
            <div className='mt-8'>
                <textarea value={value} placeholder='Enter Content Here..' 
                onChange={e => setValue(e.target.value)} rows={20}
                className='rounded-2xl mt-4 min-w-[500px] p-4'/>
            </div>
        </div>
    )
}

export default Home
