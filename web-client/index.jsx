import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './src';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('app');

  createRoot(node).render(<App />);
});
