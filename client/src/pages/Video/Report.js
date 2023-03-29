import React, { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ReactiveButton from 'reactive-button';

import BarChart from './BarChart';
import ReportStats from './ReportStats';
import ReportSpammers from './ReportSpammers';

const Report = ({ videoItems = [], id = '', result = null, setShowReport }) => {
  const [exporting, setExporting] = useState('idle');
  const barData = [result.spamPerc, 100 - result.spamPerc];
  const reportStats = {
    viewCount: videoItems[0].statistics.viewCount,
    likeCount: videoItems[0].statistics.likeCount,
    favoriteCount: videoItems[0].statistics.favoriteCount,
    commentCount: videoItems[0].statistics.commentCount,
    spamPerc: result.spamPerc,
    uniqueCommenters: result.commentsGrouped.size,
    likelySpammers: result.likelySpammers.length,
  };

  const printReport = () => {
    setExporting('loading');
    window.print();
    setExporting('success');
  };

  return (
    <div>
      <div className='report-upper'>
        <p className='report-heading'>Video Comment Report</p>
        <div className='comment-btns'>
          <button
            onClick={() => setShowReport(false)}
            to='/'
            className='back-btn'
          >
            <ChevronLeftIcon className='h-6 w-6' />
          </button>

          <ReactiveButton
            buttonState={exporting}
            idleText='Export Report'
            loadingText='Exporting... Wait'
            successText='Report Exported'
            onClick={printReport}
            size='large'
            rounded
            style={{
              padding: '12px 24px',
            }}
          />
        </div>
      </div>
      <div className='report-container'>
        <div className='report-top'>
          <ReportStats reportStats={reportStats} />

          <div className='report-item report-chart'>
            <p className='report-header chart-header'>SPAM vs HAM comments</p>
            <div className='chart'>
              <BarChart barData={barData} />
            </div>
          </div>
        </div>

        <div className='report-bottom'>
          <div className='report-item report-spammer'>
            <p className='report-header spammer-header'>Likely Spammers</p>
            <ReportSpammers likelySpammers={result.likelySpammers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
