import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BoardPost = (props) => {

    const params  = useParams();
    console.log(params);
    console.log(props);

    return (
        <div>
            {params.boardSeq}
        </div>
    );
};

export default BoardPost;