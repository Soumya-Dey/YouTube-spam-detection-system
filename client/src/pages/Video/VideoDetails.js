import React, { useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import { formatNumber } from '../../utils/formatter';
import CommentItem from './CommentItem';
import VideoInfo from './VideoInfo';

import { commentsLoader } from '../../loaders/videoDetailsLoader';

const VideoDetails = () => {
  const { id } = useParams();
  const {
    videoData: { items: videoItems },
    commentData: { items: commentItems, nextPageToken: commentPageToken },
  } = useLoaderData();

  const [comments, setComments] = useState(commentItems);
  const [nextPageToken, setNextPageToken] = useState(commentPageToken);
  const [fetching, setFetching] = useState(false);
  const [reportReady, setRepotrReady] = useState(false);

  const loadMoreComments = async () => {
    console.log('loading more...');
    setFetching(true);

    try {
      const commentData = await commentsLoader(id, 10, nextPageToken);
      console.log({ moreComments: commentData });
      setComments([...comments, ...commentData.items]);
      setNextPageToken(commentData.nextPageToken);
    } catch (error) {
      console.error({ error });
    } finally {
      setFetching(false);
    }
  };

  const hasMoreComments = !!nextPageToken;

  return (
    <div className='video-container'>
      <VideoInfo videoItems={videoItems} id={id} />

      <div className='video-right'>
        <div className='comment-btns'>
          <Link to='/' className='back-btn'>
            <ChevronLeftIcon className='h-6 w-6' />
          </Link>
          <button className='analyze-btn'>Analyze Comments</button>
          {reportReady ? (
            <button className='report-btn'>View Report</button>
          ) : null}
        </div>
        <div className='video-comments'>
          <p className='comment-heading'>
            {formatNumber(videoItems[0].statistics.commentCount)} Comments
          </p>

          <div className='comment-list'>
            {comments.map((comment) => (
              <CommentItem comment={comment} key={comment.id} />
            ))}
          </div>
          {hasMoreComments ? (
            fetching ? (
              <div key='loader' className='loader'>
                Loading ...
              </div>
            ) : (
              <button className='loader' onClick={loadMoreComments}>
                Load More Comments
              </button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
