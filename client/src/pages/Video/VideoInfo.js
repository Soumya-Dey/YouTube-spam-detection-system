import React from 'react';
import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

import { formatNumber, formatDateDistance } from '../../utils/formatter';

const VideoInfo = ({ videoItems = [], id = '' }) => {
  return (
    <div className='video'>
      <a
        className='video-back'
        style={{
          backgroundImage: `url("${
            videoItems[0].snippet.thumbnails.high
              ? videoItems[0].snippet.thumbnails.high.url
              : videoItems[0].snippet.thumbnails.default.url
          }")`,
        }}
        href={`https://www.youtube.com/watch?v=${id}`}
      ></a>
      <div className='video-info'>
        <div className='video-details'>
          <a
            className='video-title'
            href={`https://www.youtube.com/watch?v=${id}`}
          >
            {videoItems[0].snippet.title}
          </a>
          <p className='video-channel'>
            {videoItems[0].snippet.channelTitle}
            &nbsp;&nbsp;|&nbsp;&nbsp;
            {formatDateDistance(videoItems[0].snippet.publishedAt)}
          </p>
          <div className='video-stat'>
            <p className='view-count'>
              <EyeIcon className='h-5 w-5' />{' '}
              {formatNumber(videoItems[0].statistics.viewCount)}
            </p>
            <p className='like-count'>
              <HandThumbUpIcon className='h-5 w-5' />{' '}
              {formatNumber(videoItems[0].statistics.likeCount)}
            </p>
            <p className='comment-count'>
              <ChatBubbleOvalLeftEllipsisIcon className='h-5 w-5' />
              {formatNumber(videoItems[0].statistics.commentCount)}
            </p>
          </div>
          <p className='video-desc'>{videoItems[0].snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
