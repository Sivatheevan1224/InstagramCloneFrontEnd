import axios from 'axios';
import React, { useEffect, useState } from 'react';
function Profile() {

    const [profile, setProfile]= useState(null)
    const [followers,setFollowers]= useState([])
    const [unfollowed,setUnfollowed]= useState([])

     useEffect(() => {
            axios.get('http://localhost:3000/profile')
            .then(data=> {setProfile(data.data);
            console.log(data)})
            .catch(error=> console.log(error))

            axios.get('http://localhost:3000/followers')
            .then(data=> setFollowers(data.data))
            .catch(error=> console.log(error))
        }, [unfollowed])

        function HandleOnChange(event){
            setProfile(prev => ({
                ...prev,
                [event.target.name ]: event.target.value
            }))
        }
        const handleUpdate = async ()=> {
            axios.put('http://localhost:3000/profile',profile)
            .then(console.log("updated"))
            .catch(error => console.log(error))
        }
        const handleUnfollow = async (id)=> {
            axios.delete(`http://localhost:3000/followers/${id}`)
            .then(alert("UnFollowed"))
            .then(setUnfollowed(!unfollowed))
            .catch(error => console.log(error))
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