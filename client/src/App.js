import Store from './Store.js';  
import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';
import './App.css';

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined);
  const [dai, setDai] = useState(undefined);

  // array used to trigger useEffect. Is triggered whenever there is a change to array
  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai } = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();
  },
    []);

  if (typeof window.ethereum === 'undefined') {
    return (
      <div>
        <div>
          <h1>Blockchain Ecommerce App</h1>
          <p>You need to install the latest version of Metamask</p>
        </div>
      </div>
    )
  }

  return (
    <div>
        <div>
          <h1>Blockchain Ecommerce App</h1>
          <Store paymentProcessor={paymentProcessor} dai={dai}></Store>
        </div>
      </div>
  );
}

export default App;
