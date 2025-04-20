import React from 'react';
import ReactDOM from 'react-dom/client';
import QueryClientProvider from './providers/query-client-provider';
import RouterWithContextProvider from './providers/router-with-context-provider';

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider>
      <RouterWithContextProvider />
    </QueryClientProvider>
  </React.StrictMode>,
);
