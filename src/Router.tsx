import { BrowserRouter } from 'react-router-dom';
import './assets/styles/global.scss';
import Header from './components/header/Header';
import RouterApp from './components/RouterApp';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <RouterApp />
    </BrowserRouter>
  );
}

export default Router;
