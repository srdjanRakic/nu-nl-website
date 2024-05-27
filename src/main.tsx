import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContainer from './components/AppContainer';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppContainer />
    </ErrorBoundary>
  </React.StrictMode>
);
