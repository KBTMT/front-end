import React from 'react';
import { useParams } from 'react-router-dom';


const BoardPost = () => {

    const params = useParams();
    const postId = params.postId;

    return (
        <div>
            {postId} 
        </div>
    );
};

export default BoardPost;