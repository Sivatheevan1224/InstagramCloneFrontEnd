import React, { useEffect, useState } from 'react';
import db from '../DataBase/db.json'

function Profile() {

    const [profile, setProfile]= useState(null)
    const [followers,setFollowers]= useState([])
    const [unfollowed,setUnfollowed]= useState(false)

     useEffect(() => {
            // Load profile and followers from local db.json
            try{
                setProfile(db.profile || null)
                setFollowers(db.followers || [])
            }catch(err){
                console.log('Failed to load local profile/followers', err)
            }
        }, [])

        function HandleOnChange(event){
            setProfile(prev => ({
                ...prev,
                [event.target.name ]: event.target.value
            }))
        }
        const handleUpdate = ()=> {
            // Local-only update: we update component state only since we don't have a backend
            console.log('Profile updated locally', profile)
            alert('Profile updated (local only)')
        }
        const handleUnfollow = (id)=> {
            setFollowers(prev => prev.filter(f => String(f.id) !== String(id)))
            setUnfollowed(prev => !prev)
            alert('Unfollowed')
        }

  return (
    <div className='m-5'>
        {profile ? (
            <div>
                <img src={profile.profile_pic} className='profile rounded-circle' />
                <h5>{profile.username}</h5>

                <input type="text" 
                value={profile.username}
                name="username"
                className='form-control my-4'
                onChange={HandleOnChange}/>
                <input type="text" 
                name="profile_pic"
                value={profile.profile_pic}
                className='form-control my-4' 
                onChange={HandleOnChange}/>
                <button className='btn btn-primary my-4' onClick={handleUpdate}>
                    Update</button>
            </div>
        ):(
            <div>Loading Profile...</div>
        )}

        {followers.length > 0 ? (
            followers.map(follower => (
                <div key={follower.id} className='d-flex my-2'>
                    {follower.username}
                    <button className='btn btn-secondary ms-auto'
                    onClick={()=>handleUnfollow(follower.id)}>
                        UnFollow</button></div>
            ))

        ):(
            <div> Loadig Followers</div>
        )
        }
    </div>
  )
}


export default Profile