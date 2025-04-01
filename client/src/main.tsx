// client/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import App from './App';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql' // Ensure this matches your server's GraphQL endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
