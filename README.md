# YouTube Spam Comment Detection System

In this project, we show an online spam detection system that can be used in real-time to inspect messages generated by users. The system can be deployed as a component of any online social network platform.

## The highlights of our project are

1. Collecting the comments data from several datasets available at UCI Machine Learning Repository.
2. Merging the datasets, removing naming inconsistencies, and formatting the data to the desired format.
3. Cleaning the formatting of the data by excluding words that occur frequently and don’t provide any helpful information, removing HTML tags and Non-ASCII characters.
4. Analyze the texts' features from the collected data and gain helpful knowledge after processing the collected data.
5. Compare contemporary text classification machine learning algorithms and justification.

## The scopes of the project

### **In Scope**

1. A spam comment detection model that can detect spam comments.
2. A system that can filter out unnecessary information from the comment text to improve accuracy.
3. A web interface to let users put a youtube video link and analyse the comments of each video.
4. To provide a report after the analysis of comments.

### **Out of Scope**

1. Process comments in any language other than English.

## Back-End API Server

The Back-End server is developed using Flask as the framework.

### **Endpoint 1:**

**URL**: `/`

**Method**: `GET`

**Description**: A simple endpoint that returns a message confirming that the server is running on the specified URL.

**Response Body:**

```
{
  "msg": "Server running on => http://localhost:5000"
}

```

### **Endpoint 2:**

**URL**: `/predict`

**Method**: `POST`

**Description**: This endpoint takes in an array of comments in the request body and returns a prediction of whether each comment is HAM or SPAM.

**Request Body:**

```json
{
  "comments": [
    {
      "id": 1,
      "author": "John Doe",
      "comment": "This is a legitimate comment."
    },
    {
      "id": 2,
      "author": "Jane Doe",
      "comment": "This is a spam comment."
    }
  ]
}
```

**Response Body:**

```json
[
  {
    "id": 1,
    "author": "John Doe",
    "comment": "This is a legitimate comment.",
    "class": "HAM"
  },
  {
    "id": 2,
    "author": "Jane Doe",
    "comment": "This is a spam comment.",
    "class": "SPAM"
  }
]
```

## Front-End Client

The Front-End client is developed using React JS as the framework because of its reusable component structure.

### **React App Layout**

The main layout of the React app is illustrated below with the corresponding code responsible for creating the routing structure.

**Routing Structure**

```js
const router = createBrowserRouter(
  createRoutesFromElements(
    // Main app layout
    <Route path='/' element={<RootLayout />}>
      {/* Home Page */}
      <Route index element={<Home />} />
      {/* About Page */}
      <Route path='about' element={<About />} />
      {/* Video Page */}
      <Route path='video'>
        <Route index element={<Home />} />
        {/* Single Video Details Page */}
        <Route
          path=':id'
          element={<VideoDetails />}
          loader={videoDetailsLoader}
        />
      </Route>
    </Route>
  )
);
const App = () => <RouterProvider router={router} />;
```

### **React App Component Structure**

The route or page in the app is made up of several components. The app is divided into the following 4 pages:

1. **The Home Page**: The Home page is made up of the following components

   - **Home.js**: The Home page container.
     - **Search** component: For searching a youtube video using the link.
     - **Error** component: For showing error messages.
     - **VideoList** component: For the list of previously analysed videos.
       - **VideoItem** component: For a single video item of the **VideoList** component.

2. **The About Page**: This page shows a brief description of the software and the developers, and how to contribute to the software. This page is made up of a single component only.

3. **The Video Page** and **The Report Page** (These 2 pages are developed in the same route and rendered conditionally.): For showing the report after the analysis is done.

   - **ReportStats.js**: For showing the different stats of the video such as the percentage of spam comments, how many unique commenters are, and how many likely spammers are in the video.
   - **BarChart.js**: For showing the Bar chart of the percentage of Spam comments vs Legitimate comments.
   - **ReportSpammers.js**: For showing the list of likely spammers in the video.
