import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import Navbar from './components/Navbar';
import Articles from './pages/Articles';
import ProtectedRoute from './routes/ProtectedRoute';
import ArticlesPlan from './pages/ArticlesPlan';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/articles' element={<ProtectedRoute />}>
          <Route path='/articles' element={<Articles />} />
        </Route>
        <Route path='/articles-plan' element={<ProtectedRoute />}>
          <Route path='/articles-plan' element={<ArticlesPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
