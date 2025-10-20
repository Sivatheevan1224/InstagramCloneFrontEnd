import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import db from '../DataBase/db.json'

function Stories() {
  const[Stories,setStories]=useState([]);
  const navigate = useNavigate();

  let tot=0;
  useEffect(()=>{
          try{
            setStories(db.story || [])
          }catch(err){
            console.log('Failed to load local stories', err)
          }

      },[]);
  return (
    <div className='story d-flex'>
      <div className='d-none'>{tot=Stories.length}</div>
      {Stories.length >0 ? (
        Stories.map((story) =>(
          <div key={story.id} className='mx-1' onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
            <div className='gradient-border'>
            <img className='story-dp rounded-circle'src={story.user.profile_pic} alt="dp" />
            </div>
            <p className='text-truncate' style={{width:"50px"}}>{story.user.username}</p>
          </div>
        ))

      ): (
        <p>Loading Stories..</p>

      )}
    </div>
  )
}

export default Stories