import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pasteSlice, removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes)
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    let filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId))
    }

    return (
        <div>
            <input type='search' placeholder='Search Here' value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} className='p-2 rounded-2xl min-w-[600px] mt-5'/>
            <div className='flex flex-col gap-5 mt-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div key={paste._id} className='border'>
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                    <div className='flex flex-row gap-4 place-content-evenly'>
                                        <button>
                                            <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                                        </button>
                                        <button>
                                            <Link to={`/pastes/${paste?._id}`}>View</Link>
                                        </button>
                                        <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(paste?.content)
                                            toast.success("Copied to Clipboard")
                                            }}>Copy</button>
                                        <button>Share</button>
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Paste
