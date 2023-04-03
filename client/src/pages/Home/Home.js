import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import VideoList from './VideoList';
import Error from './Error';

const Home = () => {
  // Other related code
  useEffect(() => {
    const prevAnalysed = localStorage.getItem('prevAnalysed')
      ? JSON.parse(localStorage.getItem('prevAnalysed'))
      : [];
    setVideos(prevAnalysed);
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [videos, setVideos] = useState([]);

  const onChange = (event) => setUrl(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    setVideoId(new URL(url).searchParams.get('v'));
  };

  return (
    <div className='body'>
      {/* Error component */}
      {searchParams.get('error') && (
        <Error
          error={searchParams.get('error')}
          setSearchParams={setSearchParams}
        />
      )}
      {videoId && <Navigate to={`/video/${videoId}`} />}

      {/* Search component */}
      <div className='search'>
        <form className='search-bar' onSubmit={(event) => onSubmit(event)}>
          <input
            className='search-input'
            placeholder='Paste a youtube video link here'
            type='url'
            value={url}
            onChange={(event) => onChange(event)}
            required
          ></input>
          <button type='submit' className='search-icon'>
            <MagnifyingGlassIcon className='h-6 w-6' />
          </button>
        </form>
        <p className='search-ex'>
          Example: https://www.youtube.com/watch?v=LQ3677p5NWg
        </p>
      </div>

      {/* VideoList component */}
      <VideoList videos={videos} />
    </div>
  );
};

export default Home;
