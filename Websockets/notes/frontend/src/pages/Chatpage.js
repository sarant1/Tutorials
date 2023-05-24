import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Chatpage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const { data } = await axios.get("/api/chat")
        console.log(data)
        setChats(data)
    }


    useEffect(() => {
        fetchChats()
    }, [])
  return (
    <div>
        {chats.map( c => 
        <div key={c._id}>
            {c.chatName}
        </div>)}
    </div>
  )
}

export default Chatpage