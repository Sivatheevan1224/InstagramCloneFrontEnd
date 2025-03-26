import React, { useState, useEffect } from 'react'
import { useParams, Link , useNavigate} from 'react-router-dom'

function ViewStory() {
    const { id ,tot} = useParams();
    const [story, setStory] = useState(null);
    const navigate= useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/story/${id}`)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);  // Debugging: Check what data is returned
                setStory(data);
            })
            .catch((error) => console.log(error));
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
                    <Link to={`http://localhost:5173/story/${Number(id)-1}/${tot}`}><i className=" arrow bi bi-arrow-left-circle-fill "></i></Link>
                    <img
                        className="vh-100 "
                        src={story.image}
                        alt="story"
                    />
                    <Link to={`http://localhost:5173/story/${Number(id)+1}/${tot}`}><i className=" arrow bi bi-arrow-right-circle-fill"></i></Link>
                </div>
            ) : (
                <div>Loading..</div>
            )}
        </div>
    );
}

export default ViewStory;
