import { Layout } from './components/Layout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { ShopsTable } from './pages/ShopsTable/ShopsTable';
import { WorkersTable } from './pages/WorkersTable/WorkersTable';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/shops_table' element={<ShopsTable />}/>
          <Route path='/workers_table/' element={<WorkersTable key={window.location.pathname} />} />
          <Route path='/workers_table/:id' element={<WorkersTable key={window.location.pathname}/>} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
