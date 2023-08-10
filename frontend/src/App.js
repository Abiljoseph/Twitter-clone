
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ProtectedRoute from './pages/protectedRoute';
import Feeds from './pages/Feeds/Feeds';
import Messages from './pages/Messages/Messages';
import More from './pages/More/More';
import Notification from './pages/Notification/Notification';
import Explore from './pages/Explore/Explore';
import BookMark from './pages/Bookmark/BookMark';
import Profile from './pages/Profile/Profile';
import Lists from './pages/Lists/Lists';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>}>
          <Route index element={<Feeds />} />
        </Route>
        <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>}>
          <Route path='feed' element={<Feeds />} />
          <Route path='messages' element={<Messages />} />
          <Route path='more' element={<More />} />
          <Route path='notification' element={<Notification />} />
          <Route path='explore' element={<Explore />} />
          <Route path='bookmark' element={<BookMark />} />
          <Route path='profile' element={<Profile />} />
          <Route path='lists' element={<Lists />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
