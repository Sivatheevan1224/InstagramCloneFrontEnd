import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Suggestions() {
  const[profile,setProfile]= useState(null)
  const [suggestions,setSuggestions]= useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/profile').
    then(data=> data.json()).
    then(data => setProfile(data)).
    catch(error=> console.log(error))

    fetch('http://localhost:3000/suggestion').
    then(data=> data.json()).
    then(data => setSuggestions(data)).
    catch(error=> console.log(error))
  },[])

  // Function to handle Follow/Following toggle using className
  /*function handleFollowClick(event) {
    const followButton = event.target; // Get the clicked element
    
    // Toggle the class based on the current class
    if (followButton.classList.contains('follow')) {
      followButton.classList.remove('follow');
      followButton.classList.add('following');
      followButton.textContent = 'Following'; // Change text to "Following"
    } else {
      followButton.classList.remove('following');
      followButton.classList.add('follow');
      followButton.textContent = 'Follow'; // Change text back to "Follow"
    }
  }*/

  const handleFollow = async(id,username,profile_pic)=>{
    axios.post('http://localhost:3000/followers',{"id":id , "username":username, "profile_pic":profile_pic})
    .then(alert('Followed'))
    .catch(error => console.log(error))
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
                            <a onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}  className=' text-primary ms-auto '>Follow</a>
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