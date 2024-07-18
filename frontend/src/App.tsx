import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import PublishBlog from './pages/PublishBlog';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/publish' element={<PublishBlog />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
