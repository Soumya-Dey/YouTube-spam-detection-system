import React from 'react';

import { formatDateDistance, getMarkup } from '../../utils/formatter';

const CommentItem = ({ comment }) => {
  return (
    <div className='comment'>
      <div
        className='channel-icon'
        style={{
          backgroundImage: `url("${comment.snippet.topLevelComment.snippet.authorProfileImageUrl}")`,
        }}
      ></div>
      <div className='comment-details'>
        <p className='comment-channel'>
          {comment.snippet.topLevelComment.snippet.authorDisplayName}
          &nbsp;&nbsp;
          <span>
            {formatDateDistance(
              comment.snippet.topLevelComment.snippet.publishedAt
            )}
          </span>
        </p>
        <div
          className='comment-title'
          dangerouslySetInnerHTML={getMarkup(
            comment.snippet.topLevelComment.snippet.textDisplay
          )}
        ></div>
      </div>
    </div>
  );
};

export default CommentItem;
