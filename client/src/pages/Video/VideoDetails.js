import React, { useState } from 'react';
import { Link, Navigate, useLoaderData, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ReactiveButton from 'reactive-button';

import { formatNumber, groupBy } from '../../utils/formatter';
import CommentItem from './CommentItem';
import VideoInfo from './VideoInfo';
import Report from './Report';

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
  const [showReport, setShowReport] = useState(false);
  const [result, setResult] = useState(null);

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
          (spamComments.length / videoItems[0].statistics.commentCount) * 100
        ),
      });

      let prevAnalysed = localStorage.getItem('prevAnalysed')
        ? JSON.parse(localStorage.getItem('prevAnalysed'))
        : [];
      console.log({ prevAnalysed });
      if (
        !prevAnalysed.length ||
        prevAnalysed.findIndex((item) => item.id == id) < 0
      ) {
        const newVideo = {
          id,
          title: videoItems[0].snippet.title,
          channelTitle: videoItems[0].snippet.channelTitle,
          publishedAt: videoItems[0].snippet.publishedAt,
          thumbnail: videoItems[0].snippet.thumbnails.high
            ? videoItems[0].snippet.thumbnails.high.url
            : videoItems[0].snippet.thumbnails.default.url,
          spamPerc: Math.round(
            (spamComments.length / videoItems[0].statistics.commentCount) * 100
          ),
        };

        console.log({ prevAnalysed });
        prevAnalysed = [newVideo, ...prevAnalysed];
        console.log({ prevAnalysed });
        localStorage.setItem('prevAnalysed', JSON.stringify(prevAnalysed));
      }

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

  const hasMoreComments = !!nextPageToken;

  return showReport ? (
    // Report component
    <Report
      videoItems={videoItems}
      id={id}
      result={result}
      setShowReport={setShowReport}
    />
  ) : (
    // Video Details
    <div className='video-container'>
      {/* Returning to previous pafe if the video has less than 100 comments */}
      {videoItems[0].statistics.commentCount <= 100 && (
        <Navigate to='/?error=Please choose a video that has more than 100 comments!' />
      )}

      {/* Video Info */}
      <VideoInfo videoItems={videoItems} id={id} />

      {/* Video Comments */}
      <div className='video-right'>
        <div className='comment-btns'>
          <Link to='/' className='back-btn'>
            <ChevronLeftIcon className='h-6 w-6' />
          </Link>
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
              onClick={() => setShowReport(true)}
            />
          ) : null}
        </div>
        <div className='video-comments'>
          <p className='comment-heading'>
            {formatNumber(videoItems[0].statistics.commentCount)} Comments
          </p>

          <div className='comment-list'>
            {/* Showing the list of comments using the CommentItem component */}
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
