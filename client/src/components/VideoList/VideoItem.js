import React from 'react';
import PropTypes from 'prop-types';

const VideoItem = ({
  video: {
    id = '',
    snippet: {
      title = '',
      publishedAt = '',
      thumbnails: {
        default: { url = '' },
      },
      channelTitle = '',
    },
    spamPerc = 0,
  },
}) => {
  return (
    <div className='video video-1'>
      <a
        className='video-back'
        style={{
          backgroundImage: `url("${url}")`,
        }}
        href={`https://www.youtube.com/watch?v=${id}`}
      >
        <p className='spam-perc'>{spamPerc}% SPAM COMMENTS</p>
      </a>
      <div className='video-info'>
        <div className='video-icon'>{channelTitle[0].toUpperCase()}</div>
        <div className='video-details'>
          <a
            className='video-title'
            href={`https://www.youtube.com/watch?v=${id}`}
          >
            {title.substring(0, 50)}...
          </a>
          <p className='video-channel'>{channelTitle}</p>
          <p className='video-time'>{publishedAt}</p>
        </div>
      </div>
    </div>
  );
};

VideoItem.propTypes = {
  video: PropTypes.object,
};

export default VideoItem;
