import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { store,persistor } from './redux/store'
import { Provider } from 'react-redux'
import { ReactQueryDevtools } from 'react-query/devtools'
import { PersistGate } from 'redux-persist/es/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';



const queryClient = new QueryClient()

persistor.purge()

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
