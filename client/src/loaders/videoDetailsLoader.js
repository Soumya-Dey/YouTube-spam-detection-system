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
    url: `https://www.googleapis.com/youtube/v3/commentThreads?part=id,snippet&maxResults=20&videoId=${id}&key=AIzaSyBAYuaxb_9SI3hQZDEdCmUfQyMBfEdcENQ`,
    method: 'get',
  });
  if (commentStatus != 200) {
    throw Error('Video not found!');
  }

  return { videoData, commentData };
};
