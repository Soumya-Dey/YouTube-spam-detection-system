import React from 'react';

import { formatNumber } from '../../utils/formatter';

const ReportStats = ({
  reportStats: {
    viewCount = 0,
    likeCount = 0,
    favoriteCount = 0,
    commentCount = 0,
    spamPerc = 0,
    uniqueCommenters = 0,
    likelySpammers = 0,
  },
}) => {
  return (
    <div className='report-item report-stats'>
      <p className='report-header stats-header'>Video Stats</p>
      <div className='stats-info'>
        <p className='stats-value'>
          <span>{formatNumber(viewCount)}</span> views
        </p>
        <p className='stats-value'>
          <span>{formatNumber(likeCount)}</span> likes
        </p>
        <p className='stats-value'>
          <span>{formatNumber(favoriteCount)}</span> favourites
        </p>
        <p className='stats-value'>
          <span>{formatNumber(commentCount)}</span> comments
        </p>
        <p className='stats-value'>
          <span>{spamPerc}%</span> spam
        </p>
        <p className='stats-value'>
          <span>{100 - spamPerc}%</span> ham
        </p>
        <p className='stats-value'>
          <span>{uniqueCommenters}</span> unique commenters
        </p>
        <p className='stats-value'>
          <span>{likelySpammers}</span> likely spammers
        </p>
      </div>
    </div>
  );
};

export default ReportStats;
