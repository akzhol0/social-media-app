import { BrowserRouter } from 'react-router-dom';
import './assets/styles/global.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RouterApp from './components/RouterApp';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <RouterApp/>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
