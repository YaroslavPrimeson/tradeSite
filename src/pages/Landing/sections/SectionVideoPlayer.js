import React from 'react';
import ReactPlayer from "react-player/youtube";

const SectionVideoPlayer = () => {
    return (
        <div className="video__container">
            <ReactPlayer
                url='https://www.youtube.com/watch?v=kiWxR-8xTEU'
                playing={true}
                loop={true}
                controls={false}
                muted={true}
                light={false}
                style={{transform: 'scale(1.5)'}}
                width={'100%'}
                height={'100%'}
            />
        </div>
    );
};

export default SectionVideoPlayer;