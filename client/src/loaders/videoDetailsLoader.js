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

export const performAnalysis = async (id) => {
  let result = [];
  let pageToken = '';
  do {
    const {
      status: commentStatus,
      data: { items: commentItems, nextPageToken },
    } = await axios({
      url: `https://www.googleapis.com/youtube/v3/commentThreads?part=id,snippet&maxResults=100&videoId=${id}&pageToken=${pageToken}&key=AIzaSyBAYuaxb_9SI3hQZDEdCmUfQyMBfEdcENQ`,
      method: 'get',
    });
    pageToken = commentStatus == 200 ? nextPageToken || '' : '';

    const comments = commentItems.map((comment) => {
      return {
        id: comment.id,
        comment:
          comment.snippet &&
          comment.snippet.topLevelComment &&
          comment.snippet.topLevelComment.snippet
            ? comment.snippet.topLevelComment.snippet.textOriginal || ''
            : '',
        author:
          comment.snippet &&
          comment.snippet.topLevelComment &&
          comment.snippet.topLevelComment.snippet
            ? {
                channelId: comment.snippet.topLevelComment.snippet
                  .authorChannelId
                  ? comment.snippet.topLevelComment.snippet.authorChannelId
                      .value
                  : 'Unknown',
                channelUrl:
                  comment.snippet.topLevelComment.snippet.authorChannelUrl,
                channelName:
                  comment.snippet.topLevelComment.snippet.authorDisplayName,
                profileImg:
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
              }
            : null,
      };
    });
    console.log({ comments });

    const { data } = await axios({
      url: '/predict',
      method: 'post',
      data: { comments },
    });

    result = [...result, ...data];
  } while (pageToken && pageToken.length);

  return result;
};
