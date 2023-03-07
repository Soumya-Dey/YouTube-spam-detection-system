import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

import VideoList from '../VideoList/VideoList';

const Body = () => {
  const [url, setUrl] = useState('https://www.youtube.com/watch?v=LQ3677p5NWg');
  const [videos, setVideos] = useState([
    {
      kind: 'youtube#video',
      etag: 'c9DMVdi3RV4d1Ka62rZ2HkfQwWw',
      id: 'LQ3677p5NWg',
      snippet: {
        publishedAt: '2023-02-14T12:44:06Z',
        channelId: 'UCIB65_E_7XEScU2NB135wDw',
        title:
          'Murir Tin | Coke Studio Bangla | Season 2 | Riad X Pollob X Towfique',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/LQ3677p5NWg/hqdefault.jpg',
            width: 120,
            height: 90,
          },
        },
        channelTitle: 'Coke Studio Bangla',
      },
      statistics: {
        viewCount: '9455485',
        likeCount: '159597',
        favoriteCount: '0',
        commentCount: '11684',
      },
    },
    {
      kind: 'youtube#video',
      etag: 'oaY0EugaYWG3Hd0V9NNAN8RRhLg',
      id: '4eM0wCck1MU',
      snippet: {
        publishedAt: '2023-03-06T19:06:05Z',
        channelId: 'UCpryVRk_VDudG8SHXgWcG0w',
        title:
          "FAST FORWARD | All the reactions to Reiss Nelson's 96th minute winner!",
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/4eM0wCck1MU/hqdefault.jpg',
            width: 120,
            height: 90,
          },
        },
        channelTitle: 'Arsenal',
      },
      statistics: {
        viewCount: '329717',
        likeCount: '14643',
        favoriteCount: '0',
        commentCount: '642',
      },
    },
    {
      kind: 'youtube#video',
      etag: 'eVKY8pS13dbMxbwmQEDldnY8ch8',
      id: 'B6wCsHiDQtA',
      snippet: {
        publishedAt: '2023-03-04T11:52:22Z',
        channelId: 'UC5w9-0hO0ybzHC-E7DGtTdw',
        title: 'মাংসের পাতলা ঝোল রান্না—প্রেসার কুকারে | Bong Eats Bangla',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/B6wCsHiDQtA/hqdefault.jpg',
            width: 120,
            height: 90,
          },
        },
        channelTitle: 'Bong Eats Bangla',
      },
      statistics: {
        viewCount: '39015',
        likeCount: '2444',
        favoriteCount: '0',
        commentCount: '119',
      },
    },
    {
      kind: 'youtube#video',
      etag: '0ySHyBRVZ2QHFtRaEo1Hh_S3p7Q',
      id: 'wqj3eAyoje8',
      snippet: {
        publishedAt: '2021-04-08T03:37:07Z',
        channelId: 'UCv9cid0EaNXUg-oXwjVsDWQ',
        title: 'Behind the Scenes of Harry Potter and the Deathly Hallows',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/wqj3eAyoje8/hqdefault.jpg',
            width: 120,
            height: 90,
          },
        },
        channelTitle: 'pstudios',
      },
      statistics: {
        viewCount: '3186943',
        likeCount: '57098',
        favoriteCount: '0',
        commentCount: '1267',
      },
    },
  ]);
  const [commentData, setCommentData] = useState(null);

  const onChange = (event) => setUrl(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    getComments();
  };

  const getComments = async () => {
    const { data } = await axios({
      url: `https://www.googleapis.com/youtube/v3/commentThreads?part=id,snippet&maxResults=50&videoId=${new URL(
        url
      ).searchParams.get('v')}&key=AIzaSyBAYuaxb_9SI3hQZDEdCmUfQyMBfEdcENQ`,
      method: 'get',
    });

    setCommentData(data);
  };

  return (
    <div className='body'>
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

      <VideoList videos={videos} />
    </div>
  );
};

export default Body;
