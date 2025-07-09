// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

// interface representing the GrillzFarm42 contract
interface IGrillzFarm42 {
    function ownerFarmCount(address owner) external view returns (uint256);
    function isGoldFarmer(address farmer) external view returns (bool);
    function mintGoldCricket(address _to) external;
}

contract Grillz42 is ERC20 {

    // its mandatory for GrillzFarm42.sol to include balanceOf() method
    IGrillzFarm42 public grillzFarm42;

    // how many grz you can claim per farm per claim period
    uint256 public REWARD_PER_FARM = 100_000;

    // period duration, one claim per period
    uint256 public claimCooldown = 1 days;
    // storing last claim to manage claiming periods
    mapping (address => uint256) public lastClaim;

    event PurchaseProduct(address indexed buyer, string orderId, uint256 amount);
    event ClaimGrz(address indexed claimer, uint256 amount);

    // constructor for the token called GRILLZ42, GRZ42 as symbol, taking as a parameter the address of the farm builder contract
    constructor(address grillzFarm42Address) ERC20("GRILLZ42", "GRZ42"){
        grillzFarm42 = IGrillzFarm42(grillzFarm42Address);
    }

    // function to claim grz rewards for owned farms
    function claimGrz() public returns (uint256){

        // get count of farm owned by the sender
        uint256 ownedFarmCount = grillzFarm42.ownerFarmCount(msg.sender);

        // check if the sender own some farms
        require(ownedFarmCount > 0, "You don't own any farms!");

        // check the claiming cooldown
        require(lastClaim[msg.sender] + claimCooldown < block.timestamp, "Daily production already claimed today!");

        uint256 amountClaimed = ownedFarmCount * REWARD_PER_FARM;

        if (grillzFarm42.isGoldFarmer(msg.sender)) {
            amountClaimed *= 2;
        }

        // create and transfer to the sender some freshly minted GRZ
        _mint(msg.sender, amountClaimed * 10 ** decimals());

        // update the last claim value
        lastClaim[msg.sender] = block.timestamp;

        emit ClaimGrz(msg.sender, amountClaimed);

        return (amountClaimed);
    }

    // function to buy products from the marketplace
    function purchaseProduct(string memory orderId, uint256 amount) public {
        // check for balance
        require(balanceOf(msg.sender) >= amount, "Not enough $GRZ42 credits!");

        // destroy the amount of the order
        _burn(msg.sender, amount);

        // create a payment confirmation for this order
        emit PurchaseProduct(msg.sender, orderId, amount);
    }

    function mintGoldCricket() public {

        uint goldCricketPrice = 100_000 * 10 ** decimals();

        // check for balance
        require(balanceOf(msg.sender) >= goldCricketPrice, "Not enough $GRZ42 credits!");

        _burn(msg.sender, goldCricketPrice);

        grillzFarm42.mintGoldCricket(msg.sender);

    }

}
