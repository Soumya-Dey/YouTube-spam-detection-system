import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <div className='comment'>
      <div className='channel-icon'></div>
      <div className='comment-details'>
        <p className='comment-channel'>
          User&nbsp;&nbsp;<span>2 days ag0</span>
        </p>
        <p className='comment-title'>
          The seven minutes of stoppage-time against Bournemouth on Saturday
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
