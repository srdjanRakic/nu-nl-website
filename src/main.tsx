import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  </React.StrictMode>
);
