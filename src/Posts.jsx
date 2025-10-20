import React, { useEffect, useState } from 'react';
import db from '../DataBase/db.json'

function Posts() {

    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        // Load posts directly from local db.json
        try{
            setPosts(db.posts || [])
        }catch(err){
            console.log('Failed to load local db posts', err)
        }

    },[]);

return (
    <div className='d-flex justify-content-center'>
        {posts.length > 0 ? (
            <div>
                {posts.map((post) =>(
                    <div className='my-3'key={post.id}>
                        <div className='d-flex'>
                            <img className="dp rounded-circle" src={post.user.profile_pic} alt="Profile pic" />
                            <h5>{post.user.username}</h5>
                        </div>
                        <img className='image' src={post.image} alt="Posts" />
                        <div>
                        <i className="bi bi-heart"></i>
                        <i className="bi bi-chat"></i>
                        <i className="bi bi-send"></i>
                        </div>
                        <div>
                            <b>{post.likes} Likes</b>
                        </div>
                        <p>{post.caption}</p>
                    </div>
                ))}
            </div>
        ):(
            <div>
                Loading Posts....
            </div>
        )}
    </div>
)
}

export default Posts