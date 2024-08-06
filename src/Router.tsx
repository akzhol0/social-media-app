import { BrowserRouter } from 'react-router-dom';
import './assets/styles/global.scss';
import Header from './components/header/Header';
import RouterApp from './components/RouterApp';
import Footer from './components/footer/Footer';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <RouterApp/>
      <Footer/>
    </BrowserRouter>
  );
}

export default Router;
