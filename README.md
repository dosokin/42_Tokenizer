# GRZ42 - Grillz42 Token Humanitarian Project

## Context

GRZ42 is a humanitarian blockchain project developed at 42 School for the Tokenizer module. It allows users to fund cricket micro-farms in developing countries through the purchase of NFTs representing farms. In return, users receive GRZ tokens that symbolize their contribution and allow for potential community governance and gamified reputation.

##  Technical Choices

### 1. Blockchain: Ethereum
- **Why Ethereum?**
    - Decentralized, secure, and widely adopted.
    - Strong developer ecosystem.
    - Compatible with popular wallets like MetaMask.
    - Reliable testnets (e.g., Sepolia) for staging and testing.
    - Supports smart contracts and standards (ERC-20, ERC-721).

### 2. Language: Solidity
- **Why Solidity?**
    - Native language of Ethereum smart contracts.
    - Well-documented and widely used.
    - Supports token standards and advanced contract logic.
    - Allows high-level control of tokenomics and NFT minting.

### 3. Development Framework: Foundry
- **Why Foundry?**
    - Fast and developer-friendly toolchain for Solidity.
    - Native scripting, testing, and deployment tools.
    - Tests can be written directly in Solidity.
    - Lightweight alternative to Hardhat or Truffle.

### 4. Frontend Stack
- **Vanilla HTML/CSS/JS + Tailwind**
    - Lightweight and fast for a minimal MVP.
    - No need for frontend frameworks (React, Vue, etc.).
    - Tailwind CSS allows quick styling and responsiveness.

### 5. Project Structure
- `code/` — Main smart contract for NFT and GRZ logic.
- `deployment/` — Deployment scripts using Foundry.
- `deployment/frontend/` — User-facing interface with wallet integration.
- `README.md` — Technical documentation (this file).
- `documentation/WHITEPAPER.md` — Vision, purpose, and tokenomics.

## Testing and Deployment

- Contracts tested on a local Anvil node.
- Deployment to Sepolia testnet using Foundry scripts.
- Integration tested with MetaMask and frontend UI.

