import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Feed from "../../components/Feed/Feed";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'

function Home() {
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  const socket = useRef()
  const [onlineFriends , setOnlineFriends] = useState([])
  
  
  useEffect(() => {
    socket.current = io('https://starmedia.herokuapp.com' , {
      transports: ['websocket']
    })
  } , [])

  
  useEffect(() => {
    if(!user){
      navigate('/login')
    } else if(socket && user) {
      socket.current.emit('sendUser' , user?._id)
      socket.current.on('getUsers' , (users) => {
        setOnlineFriends(users.filter(u => u.userId !== user?._id))
      })
    }
  } ,[user])


  return (
    <div>
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar onlineFriends={onlineFriends} />
      </div>
    </div>
  );
}

export default Home;
