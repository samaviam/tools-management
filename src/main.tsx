import React from 'react';
import ReactDOM from 'react-dom/client';
import QueryClientProvider from './providers/query-client-provider';
import RouterWithContextProvider from './providers/router-with-context-provider';
import migrate from './db/migrate';

import './styles/global.css';

migrate();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider>
      <RouterWithContextProvider />
    </QueryClientProvider>
  </React.StrictMode>,
);
