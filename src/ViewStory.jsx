import React, { useState, useEffect } from 'react'
import { useParams, Link , useNavigate} from 'react-router-dom'
import db from '../DataBase/db.json'

function ViewStory() {
    const { id ,tot} = useParams();
    const [story, setStory] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
        try{
            // db.story contains array; find by id (ids in db.json are strings)
            const s = (db.story || []).find(st => String(st.id) === String(id));
            if(s) setStory(s)
            else console.log('Story not found in local db for id', id)
        }catch(err){
            console.log('Failed to load local story', err)
        }
    }, [id]);

    if(id>tot|| id<= 0){
        navigate('/');
    }
    return (
        <div>
            {story ? (
                <div className="d-flex justify-content-center align-items-center">
                    <div className='gradient-border'>
            <img className='story-dp rounded-circle'src={story.user.profile_pic} alt="dp" />
            </div>
            <p>{story.user.username}</p>
                    <Link to={`/story/${Number(id)-1}/${tot}`}><i className=" arrow bi bi-arrow-left-circle-fill "></i></Link>
                    <img
                        className="vh-100 "
                        src={story.image}
                        alt="story"
                    />
                    <Link to={`/story/${Number(id)+1}/${tot}`}><i className=" arrow bi bi-arrow-right-circle-fill"></i></Link>
                </div>
            ) : (
                <div>Loading..</div>
            )}
        </div>
    );
}

export default ViewStory;
