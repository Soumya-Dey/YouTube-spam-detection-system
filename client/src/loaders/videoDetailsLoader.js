import axios from 'axios';

export const videoDetailsLoader = async ({ params }) => {
  const { id } = params;

  const { status: videoStatus, data: videoData } = await axios({
    url: `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=AIzaSyBAYuaxb_9SI3hQZDEdCmUfQyMBfEdcENQ`,
    method: 'get',
  });
  if (videoStatus != 200) {
    throw Error('Video not found!');
  }

  const { status: commentStatus, data: commentData } = await axios({
    url: `https://www.googleapis.com/youtube/v3/commentThreads?part=id,snippet&maxResults=10&videoId=${id}&key=AIzaSyBAYuaxb_9SI3hQZDEdCmUfQyMBfEdcENQ`,
    method: 'get',
  });
  if (commentStatus != 200) {
    throw Error('Video not found!');
  }

  console.log({ videoData, commentData });
  return { videoData, commentData };
};

export const commentsLoader = async (id, limit = 10, pageToken = null) => {
  const { status: commentStatus, data: commentData } = await axios({
    url: `https://www.googleapis.com/youtube/v3/commentThreads?part=id,snippet&maxResults=${limit}&videoId=${id}&pageToken=${pageToken}&key=AIzaSyBAYuaxb_9SI3hQZDEdCmUfQyMBfEdcENQ`,
    method: 'get',
  });
  if (commentStatus != 200) {
    throw Error('Video not found!');
  }

  console.log({ commentData });
  return commentData;
};
