import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { addImagesListeners } from './utils'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

window.Smooch.init({ integrationId: '627a8156a09d2b00f538bfd7' });

window.Smooch.on('ready', () => {
  addImagesListeners(false)
});

window.Smooch.on('widget:opened', () => {
  addImagesListeners(true)
});

window.Smooch.on('message:received', (message) => {
  if(message.type === 'image') {
    setTimeout(() => {
      addImagesListeners(true)
    }, 400)
  }
});
