import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './App.css';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import VideoDetails from './pages/Video/VideoDetails';
import { videoDetailsLoader } from './loaders/videoDetailsLoader';

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

export default App;
