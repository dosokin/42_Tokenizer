# GRZ42 Token - Whitepaper

## Project Vision

GRZ42 is a humanitarian blockchain project designed to fund the creation of cricket micro-farms in developing countries. It enables users to directly sponsor farms by purchasing a non-transferable NFT. In return, participants receive GRZ tokens — not as an investment, but as a **symbolic reward for their impact**.

## Mission

- Encourage global participation in food security efforts.
- Provide a transparent, gamified way to sponsor real-world farms.
- Distribute symbolic tokens (GRZ42) to recognize ongoing involvement.

## Economic Model

### Farm Purchases
- Farms are purchased **in ETH** at a fixed price equivalent to **~20 USD** (this fictive undervalued micro-farm cost was choose to facilitate tests and demonstration), calculated in real-time using an **ETH/USD oracle**.
- Each purchase mints a **NFT** representing one farm.
- These NFTs serve as **proof of humanitarian contribution**.

### GRZ42 Token – Symbolic Royalties

The GRZ42 token is not a currency. It does **not offer financial return**, governance power, or speculative use.  

- GRZ tokens are **distributed daily** to farm NFT holders.
- The distribution is proportional to the number of farms owned (100,000$GRZ42 / per farm / per day, this overvalued reward amount was choose to facilitate tests and demonstration)
- GRZ rewards promote continuous support and visibility within the project.

### GRZ42 Use Cases

- **No financial or speculative value**.
- Can be used to access:
    - A **cricket-based merchandise marketplace**.
    - A rare **"Golden Cricket" NFT**, purchasable by the most committed farmers.

## ETH/USD Oracle

To keep the cost of a farm stable in fiat terms, an **oracle** provides real-time ETH/USD data.  
The system calculates how much ETH is needed to equal 20 USD at the moment of the transaction.

## NFTs as Proof of Impact

- One NFT is minted per farm.
- All farms are visualized on a global dashboard.
- Users can see their personal contribution and global impact.
- Top contributors may purchase the **"Golden Cricket" NFT**.

## Security and Transparency

- Fully open-source smart contracts.
- No admin roles, upgradeability, or owner-based minting.
- Verified on testnets before deployment.
- Rewards logic written and tested in Solidity (Foundry).

## Accessibility

- Simple and intuitive interface.
- No registration required.
- Compatible with MetaMask.

---

## Useful functions

- Grillz42
  - function claimGrz() public returns (uint256)
    - Claim daily farm's ownership rewards (100,000$GRZ42/farm/day)
  - function mintGoldCricket() public
    - Claim Gold Cricket NFT for 100,000$GRZ42
- GrillzFarm42
  - function buildFarm(int64 latitude, int64 longitude, string memory farmName) public payable returns (uint256)
    - Build a new farm
---

## Conclusion

**GRZ42 is not a token for speculation.**  
It is a symbol of positive action — designed to reward those who contribute to sustainable food production.  
By combining blockchain transparency with humanitarian goals, GRZ offers a **new model for decentralized impact**.

