import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Stats from '../pages/Stats';
import ProducerForm from '../pages/Producer/ProducerForm';
import ProducerList from '../pages/Producer/ProducerList';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/estatisticas" element={<Stats />} />
      <Route path="/produtores" element={<ProducerList />} />
      <Route path="/produtores/novo" element={<ProducerForm />} />
      <Route path="/produtores/detalhes/:id" element={<ProducerForm />} />
      <Route path="/produtores/editar/:id" element={<ProducerForm />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
