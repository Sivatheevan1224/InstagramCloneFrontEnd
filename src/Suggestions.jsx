import React, { useEffect, useState } from 'react'
import db from '../DataBase/db.json'

function Suggestions() {
  const[profile,setProfile]= useState(null)
  const [suggestions,setSuggestions]= useState([])

  useEffect(()=>{
    // Load profile and suggestions from local db.json
    try{
      setProfile(db.profile || null)
      setSuggestions(db.suggestion || [])
    }catch(err){
      console.log('Failed to load local db profile/suggestions', err)
    }
  },[])

    // Legacy networked follow helper removed — using local state only now

  const handleFollow = (id,username,profile_pic)=>{
    // Update local suggestions state to simulate follow action
    setSuggestions((prev)=> prev.filter(s => s.id !== id))
    alert('Followed '+ username)
  }
  return (
    <div className='position-fixed'>
      <div className='suggestions m-4' >
      {profile ?
      <div className='d-flex'>
        <img className="dp rounded-circle" src={profile.profile_pic} alt="Profile pic" />
        <h5>{profile.username}</h5>
        <small className='ms-auto text-primary'>Switch</small>
      </div>
      :<p>Loading Profile...</p>}
      <div className='d-flex' >
      <p>suggested for You</p>
      <b className='ms-auto'>See All</b>
      </div>

      {suggestions.length > 0 ? (
            <div>
                {suggestions.map((suggestion) =>(
                    <div key={suggestion.id}>
                        <div className='d-flex'>
                            <img className="dp rounded-circle" src={suggestion.profile_pic} alt="Profile pic" />
                            <h5>{suggestion.username}</h5>
                            <a  onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}  className=' followButton text-primary ms-auto '>Follow</a>
                        </div>
                    </div>
                ))}
            </div>
        ):(
            <div>
                Loading....
            </div>
        )}
      </div>
      
    </div>
  )
}

export default Suggestions