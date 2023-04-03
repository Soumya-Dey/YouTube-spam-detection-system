import React from 'react';
import { Link } from 'react-router-dom';
import ReactiveButton from 'reactive-button';

const About = () => {
  return (
    <div className='about-container'>
      <div className='about-info'>
        <p className='about-heading'>YouTube Spam Comment Detector</p>
        <p className='about-desc'>
          An easy to use User-Interface to perform analysis on the comments of
          your YouTube videos and get a detailed report on Spam comment
          analysis. The detected spammers can be reported to YouTube directly
          from the interface.
        </p>
      </div>

      <div className='about-btns'>
        <Link to='/'>
          <ReactiveButton
            idleText='Use the App'
            size='large'
            rounded
            style={{ padding: '12px 24px' }}
          />
        </Link>

        <a
          href='https://github.com/Soumya-Dey/YouTube-spam-detection-system'
          target='_blank'
        >
          <ReactiveButton
            idleText='Contribute to the project'
            size='large'
            color='teal'
            rounded
            style={{ padding: '12px 24px' }}
          />
        </a>
      </div>
    </div>
  );
};

export default About;
