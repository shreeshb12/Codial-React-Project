import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './styles/index.css';
import {App} from './components';
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { PostProvider } from './providers/PostProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <ToastContainer/>
      <AuthProvider>
        <PostProvider>
          <App/>
        </PostProvider>
      </AuthProvider>
    </Router>
);
