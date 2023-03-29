import React from 'react';

const ReportSpammers = ({ likelySpammers = [] }) => {
  return (
    <div className='spammer-info'>
      {likelySpammers.map((spammer, i) => (
        <div className='spammer-item comment' key={spammer.channelId}>
          <div
            className='channel-icon'
            style={{
              backgroundImage: `url("${spammer.profileImg}")`,
            }}
          ></div>
          <div className='comment-details'>
            <p className='comment-channel'>
              {spammer.channelName.substring(0, 12)}
            </p>
            <a href={`${spammer.channelUrl}`}>View</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportSpammers;
