import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.sass'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App/>
);