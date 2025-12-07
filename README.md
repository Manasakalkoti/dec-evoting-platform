📌 E-Voting dApp — Decentralized Voting Prototype

A decentralized voting prototype built using Ethereum smart contracts, Truffle, Ganache, and Web3.js.
This project demonstrates how blockchain can provide transparent, tamper-proof vote storage and a complete voting workflow.

 Features

Party Registration (Admin)
Voter Registration Flow (UI simulation)
Face & Aadhaar Verification UI (simulated for prototype)
Vote Casting Through Smart Contract
Live Results Display (auto-refresh from blockchain)
Fully on-chain vote storage (no backend database)

 Tech Stack
Smart Contract Layer
Solidity
Truffle (compiling & migrations)
Ganache (local blockchain)
Frontend
HTML, CSS, JavaScript
jQuery
Web3.js
AnyChart (for results visualization)

E-Voting-dApp/
│
├── contracts/
│   ├── Migrations.sol
│   ├── VoteLibrary.sol
│   └── VoteTracker.sol
│
├── build/contracts/        # Auto-generated ABIs
│
├── src/
│   ├── css/
│   ├── js/
│   ├── images/
│
├── index.html              # Landing page
├── AdminVerification1.html
├── VoterVerification1.html
├── VoterVerification2.html
├── VotingPortal.html
├── Results.html
│
├── index.js                # Core Web3 & contract interaction
├── package.json
├── bs-config.json
└── truffle-config.js


1. Node.js

Download from: https://nodejs.org

2. Truffle
npm install -g truffle

3. Ganache

Download from: https://trufflesuite.com/ganache/

4. MetaMask

Browser extension for interacting with blockchain.



How to Run the Project (Full Steps)
1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

2. Install dependencies
npm install

3. Start Ganache

Open Ganache GUI

Make sure it runs on:

RPC Server: http://127.0.0.1:7545

4. Configure MetaMask

Add a Custom RPC

Network name: Ganache

RPC URL: http://127.0.0.1:7545

Chain ID: 1337 or 5777 (Ganache shows it)

Then import the private keys from Ganache into MetaMask if needed.

5. Compile and Deploy Smart Contracts
truffle migrate --reset


This creates and deploys:

VoteTracker

Migrations contract

to your local blockchain.

6. Start the Frontend
npm run dev


This launches a local development server.

Your dApp will be available at:

http://localhost:3000


(May vary depending on lite-server settings)
