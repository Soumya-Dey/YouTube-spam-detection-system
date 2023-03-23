import React, { useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ReactiveButton from 'reactive-button';

import { formatNumber, groupBy } from '../../utils/formatter';
import CommentItem from './CommentItem';
import VideoInfo from './VideoInfo';

import {
  commentsLoader,
  performAnalysis,
} from '../../loaders/videoDetailsLoader';

const VideoDetails = () => {
  const { id } = useParams();
  const {
    videoData: { items: videoItems },
    commentData: { items: commentItems, nextPageToken: commentPageToken },
  } = useLoaderData();

  const [comments, setComments] = useState(commentItems);
  const [nextPageToken, setNextPageToken] = useState(commentPageToken);
  const [fetching, setFetching] = useState(false);
  const [analysing, setAnalysing] = useState('idle');
  const [reportReady, setRepotrReady] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeComments = async () => {
    console.log('performing analysis...');
    setAnalysing('loading');

    try {
      const analysisResult = await performAnalysis(id);

      const spamComments = [];
      const likelySpammers = [];
      const commentsGrouped = groupBy(
        analysisResult,
        (comment) => comment.author.channelId
      );

      console.log({ commentsGrouped });
      analysisResult.forEach((comment) => {
        if (comment.class == 'SPAM') {
          spamComments.push(comment);
          if (
            comment.author &&
            likelySpammers.findIndex(
              (spammer) => spammer.channelId == comment.author.channelId
            ) < 0
          )
            likelySpammers.push(comment.author);
        }
      });
      setResult({
        analysisResult,
        spamComments,
        likelySpammers,
        commentsGrouped,
        spamPerc: Math.round(
          (spamComments.length / analysisResult.length) * 100
        ),
      });

      console.log({
        result,
      });
    } catch (error) {
      console.error({ error });
    } finally {
      setAnalysing('success');
      setRepotrReady(true);
    }
  };

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
          {/* <button className='analyze-btn' onClick={analyzeComments}>
            {analysing ? 'Analysing... ' : 'Analyze Comments'}
          </button> */}
          <ReactiveButton
            buttonState={analysing}
            idleText='Analyse Comments'
            loadingText='Analysing... Wait'
            successText='Analysis Complete'
            onClick={analyzeComments}
            size='large'
            rounded
            style={{ padding: '12px 24px' }}
          />
          {reportReady ? (
            <ReactiveButton
              idleText='View Report'
              size='large'
              color='teal'
              rounded
              style={{ padding: '12px 24px' }}
            />
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
