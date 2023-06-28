import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { store,persistor } from './redux/store'
import { Provider } from 'react-redux'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from "redux-persist/integration/react";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
						<App />
						<ReactQueryDevtools initialIsOpen={false} />
					</PersistGate>
        </Provider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
