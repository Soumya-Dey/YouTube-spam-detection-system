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
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />

      <Route path='video'>
        <Route index element={<Home />} />
        <Route
          path=':id'
          element={<VideoDetails />}
          loader={videoDetailsLoader}
        />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
