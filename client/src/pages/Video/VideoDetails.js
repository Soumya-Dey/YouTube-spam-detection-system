import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

import { formatNumber, formatDateDistance } from '../../utils/formatter';
import CommentItem from './CommentItem';
import VideoInfo from './VideoInfo';

const VideoDetails = () => {
  const { id } = useParams();
  const {
    videoData: { items: videoItems },
    commentData: { items: commentItems },
  } = useLoaderData();

  console.log({ videoItems, commentItems });

  return (
    <div className='video-container'>
      <VideoInfo videoItems={videoItems} id={id} />
      <div className='video-comments'>
        <p className='comment-heading'>
          {formatNumber(videoItems[0].statistics.commentCount)} Comments
        </p>
        <div className='comment-list'>
          {commentItems.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
