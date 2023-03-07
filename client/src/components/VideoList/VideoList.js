import React from 'react';
import PropTypes from 'prop-types';

import VideoItem from './VideoItem';

const VideoList = ({ videos = [] }) => {
  return (
    <div className='prev-videos'>
      <p className='heading text-white-500'>Previously analysed videos</p>
      <div className='video-grid'>
        {videos.length
          ? videos.map((video, i) => <VideoItem video={video} key={i} />)
          : 'Search with a YouTube video and analyse for spam comments...'}
      </div>
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.array,
};

export default VideoList;
