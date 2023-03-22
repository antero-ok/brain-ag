import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Stats from '../pages/Stats';
import AddProducer from '../pages/Producer/AddProducer';
import ProducerList from '../pages/Producer/ProducerList';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="estatisticas" element={<Stats />} />
      <Route path="produtores" element={<ProducerList />} />
      <Route path="produtores/novo" element={<AddProducer />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
