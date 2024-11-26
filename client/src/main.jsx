import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from './state'

import App from './App';
import './index.css';

const SEPOLIA_CHAIN_ID = 11155111;

createRoot(document.getElementById('root')).render(
  <ThirdwebProvider desiredChainId={SEPOLIA_CHAIN_ID}>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
