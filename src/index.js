import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom/client' içeri aktarılır
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
