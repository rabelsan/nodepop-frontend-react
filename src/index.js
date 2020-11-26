import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import storage from './utils/storage';
import { configureClient } from './api/client';

import './index.css';

const auth = storage.get('auth') || { token: null };

configureClient(auth.token);

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <div>Something went wrong!</div>;
    }

    return this.props.children;
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App initiallyLoggedUserId={auth.token} />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
);
