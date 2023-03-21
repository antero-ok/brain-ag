import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Producers from '../pages/Producers';
import Stats from '../pages/Stats';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="estatisticas" element={<Stats />} />
      <Route path="produtores" element={<Producers />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
