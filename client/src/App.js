import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';

import './App.css';
import logo from './assets/logo.svg';
import githubIcon from './assets/github-icon.svg';

const App = () => {
  return (
    <div className='main-container'>
      <div className='navbar'>
        <Bars3Icon className='h-8 w-8' />
        <img src={logo} alt='YouTube Spam Detector Logo' className='logo' />
        <img src={githubIcon} alt='GitHub Icon' className='h-6 w-6 github' />
      </div>

      <div className='body'>
        <div className='search'>
          <div className='search-bar'>
            <input
              className='search-input'
              placeholder='Paste a youtube video link here'
            ></input>
            <button className='search-icon'>
              <MagnifyingGlassIcon className='h-6 w-6' />
            </button>
          </div>
          <p className='search-ex'>
            Example: https://www.youtube.com/watch?v=LQ3677p5NWg
          </p>
        </div>

        <div className='prev-videos'>
          <p className='heading text-white-500'>Previously analysed videos</p>
          <div className='video-grid'>
            <div className='video video-1'>
              <div className='video-back'>
                <p className='spam-perc'>55% SPAM</p>
              </div>
              <div className='video-info'>
                <div className='video-icon'>i</div>
                <div className='video-details'>
                  <p className='video-title'>Short video title here</p>
                  <p className='video-channel'>Youtube channel</p>
                  <p className='video-time'>5 hours ago</p>
                </div>
              </div>
            </div>
            <div className='video video-2'>
              <div className='video-back'>
                <p className='spam-perc'>55% SPAM</p>
              </div>
              <div className='video-info'>
                <div className='video-icon'>i</div>
                <div className='video-details'>
                  <p className='video-title'>Short video title here</p>
                  <p className='video-channel'>Youtube channel</p>
                  <p className='video-time'>5 hours ago</p>
                </div>
              </div>
            </div>
            <div className='video video-3'>
              <div className='video-back'>
                <p className='spam-perc'>55% SPAM</p>
              </div>
              <div className='video-info'>
                <div className='video-icon'>i</div>
                <div className='video-details'>
                  <p className='video-title'>Short video title here</p>
                  <p className='video-channel'>Youtube channel</p>
                  <p className='video-time'>5 hours ago</p>
                </div>
              </div>
            </div>
            <div className='video video-4'>
              <div className='video-back'>
                <p className='spam-perc'>55% SPAM</p>
              </div>
              <div className='video-info'>
                <div className='video-icon'>i</div>
                <div className='video-details'>
                  <p className='video-title'>Short video title here</p>
                  <p className='video-channel'>Youtube channel</p>
                  <p className='video-time'>5 hours ago</p>
                </div>
              </div>
            </div>
            <div className='video video-5'>
              <div className='video-back'>
                <p className='spam-perc'>55% SPAM</p>
              </div>
              <div className='video-info'>
                <div className='video-icon'>i</div>
                <div className='video-details'>
                  <p className='video-title'>Short video title here</p>
                  <p className='video-channel'>Youtube channel</p>
                  <p className='video-time'>5 hours ago</p>
                </div>
              </div>
            </div>
            <div className='video video-6'>
              <div className='video-back'>
                <p className='spam-perc'>55% SPAM</p>
              </div>
              <div className='video-info'>
                <div className='video-icon'>i</div>
                <div className='video-details'>
                  <p className='video-title'>Short video title here</p>
                  <p className='video-channel'>Youtube channel</p>
                  <p className='video-time'>5 hours ago</p>
                </div>
              </div>
            </div>
            <div className='video video-7'>
              <div className='video-back'>
                <p className='spam-perc'>55% SPAM</p>
              </div>
              <div className='video-info'>
                <div className='video-icon'>i</div>
                <div className='video-details'>
                  <p className='video-title'>Short video title here</p>
                  <p className='video-channel'>Youtube channel</p>
                  <p className='video-time'>5 hours ago</p>
                </div>
              </div>
            </div>
            <div className='video video-8'>
              <div className='video-back'>
                <p className='spam-perc'>55% SPAM</p>
              </div>
              <div className='video-info'>
                <div className='video-icon'>i</div>
                <div className='video-details'>
                  <p className='video-title'>Short video title here</p>
                  <p className='video-channel'>Youtube channel</p>
                  <p className='video-time'>5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
