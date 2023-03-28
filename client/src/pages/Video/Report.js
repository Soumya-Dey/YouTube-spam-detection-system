import React from 'react';

import DoughnutChart from './DoughnutChart';

const Report = () => {
  return (
    <div>
      {/* <p className='report-heading'>Video Comment Report</p> */}
      <div className='report-container'>
        <div className='report-left'>
          <div className='report-item report-stats'>
            <p className='report-header stats-header'>Video Stats</p>
            <div className='stats-info'>
              <p className='stats-view'>
                <span>678K</span> views
              </p>
              <p className='stats-like'>
                <span>68K</span> likes
              </p>
              <p className='stats-favourite'>
                <span>459</span> favourites
              </p>
              <p className='stats-comment'>
                <span>12K</span> comments
              </p>
              <p className='stats-comment'>
                <span>21%</span> spam
              </p>
              <p className='stats-comment'>
                <span>79%</span> ham
              </p>
            </div>
          </div>

          <div className='report-item report-chart'>
            <p className='report-header spammer-header'>Likely Spammers</p>
            <div className='spammer-info'></div>
          </div>
        </div>

        <div className='report-right'>
          <div className='report-item report-chart'>
            <p className='report-header chart-header'>Analysis of Comments</p>
            <div className='chart'>
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
