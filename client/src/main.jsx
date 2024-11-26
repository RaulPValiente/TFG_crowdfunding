import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from './state'
import { Sepolia } from "@thirdweb-dev/chains";

import App from './App';
import './index.css';

const CLIENT_ID = "23f367c462a36456d61d8321e9c3aaec";

createRoot(document.getElementById('root')).render(
  <ThirdwebProvider activeChain={Sepolia} desiredChainId={Sepolia.chainId} clientId={CLIENT_ID}>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
