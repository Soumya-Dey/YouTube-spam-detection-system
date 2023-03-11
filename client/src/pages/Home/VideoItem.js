import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/outline';

import { formatDateDistance } from '../../utils/formatter';

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
      <NavLink
        className='video-back'
        style={{
          backgroundImage: `url("${url}")`,
        }}
        to={`/video/${id}`}
      >
        <p className='spam-perc'>{spamPerc}% SPAM COMMENTS</p>
      </NavLink>
      <div className='video-info'>
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          className='video-icon'
        >
          <PlayIcon className='h-5 w-5' />
        </a>
        <div className='video-details'>
          <NavLink className='video-title' to={`/video/${id}`}>
            {title.length > 74 ? `${title.substring(0, 74)}...` : title}
          </NavLink>
          <p className='video-channel'>
            {channelTitle}&nbsp;&nbsp;|&nbsp;&nbsp;
            {formatDateDistance(publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

VideoItem.propTypes = {
  video: PropTypes.object,
};

export default VideoItem;
