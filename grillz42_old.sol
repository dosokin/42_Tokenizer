// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";


contract grillz42 is ERC20, ERC20Permit {

    struct Farm {
        uint16 id;
        uint32 latitude;
        uint32 longitude;
        string name;
    }

    address[] public Holders;

    event buildFarm(address indexed owner, Farm farmBuilt);
    event buyGrz(address indexed buyer, uint amount);
    event claimAirdrop(address indexed claimer);

    uint randNone = 0;
    uint ETHtoGRZ = 100_000;

    uint24 cooldownDelay = 1 days;
    mapping (address => uint256) lastAirdropClaim;

    mapping (uint16 => address) farmToOwner;
    mapping (address => uint16) farmCount;


    constructor() ERC20("GRILLZ42", "GRZ") ERC20Permit("GRILLZ42") {
        _mint(address(this), 1_000_000 * 10**decimals());
    }

    function getHolders() public view returns (address[] memory) {
        return Holders;
    }

    function ownerFarmCount(address owner) public view returns (uint16) {
        return farmCount[owner];
    }

    function airdrop() external {
        require(lastAirdropClaim[msg.sender] + cooldownDelay < block.timestamp, "airdrop already claimed today");
        require(balanceOf(address(this)) > 10_000 * 10**decimals(), "airdrop is over");

        _transfer(address(this), msg.sender, 10_000 * 10**decimals());
        lastAirdropClaim[msg.sender] = block.timestamp;

        emit claimAirdrop(msg.sender);

        Holders.push(msg.sender);
    }

    function buyGRZ() external payable {

        require(msg.value > 0, "please send some eth");
        require(msg.value * ETHtoGRZ <= balanceOf(address(this)), "no GRZ available rn");

        _transfer(address(this), msg.sender, msg.value * ETHtoGRZ);
        emit buyGrz(msg.sender, msg.value * ETHtoGRZ);

        Holders.push(msg.sender);
    }

    function buyFarm(uint32 latitude, uint32 longitude, string calldata farmName) external {

        require(balanceOf(msg.sender) >= 100_000 * 10**decimals(), "not enough GRZ in wallet");

        _burn(address(msg.sender), 25_000 * 10**decimals());
        _transfer(address(msg.sender), address(this), 75_000 * 10**decimals());


        uint16 farmId = uint16(uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNone))));
        randNone += 1;

        farmToOwner[farmId] = msg.sender;
        farmCount[msg.sender] += 1;

        emit buildFarm(msg.sender, Farm(farmId, latitude, longitude, farmName));

        Holders.push(msg.sender);
    }
}
