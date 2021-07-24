import { ethers, Contract } from 'ethers';
import PaymentProcessor from './contracts/PaymentProcessor.json';
import Dai from './contracts/Dai.json';

// function to create connection to ethereum
const getBlockchain = () =>
    new Promise((resolve, reject) => {
        // called when everything in the window is loaded including js scripts and metamask
        window.addEventListener('load', async () => {
            // metamask injects an ethereum object 
            if (window.ethereum) {
                // wait for user to grant access
                await window.ethereum.enable();
                // await window.eth_requestAccounts;

                // connection to the bc
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                // allows sending of transactions
                const signer = provider.getSigner();

                // object that can interact with payment processor smart contract
                const paymentProcessor = new Contract(
                    PaymentProcessor.networks[window.ethereum.networkVersion].address,
                    PaymentProcessor.abi,
                    signer
                );

                // object that can interact with dai smart contract
                const dai = new Contract(
                    Dai.networks[window.ethereum.networkVersion].address,
                    Dai.abi,
                    signer
                );
                // end of promise
                resolve({ provider, paymentProcessor, dai });
            }
            resolve({ provider: undefined, paymentProcessor: undefined, dai: undefined });
        });
    });

export default getBlockchain;