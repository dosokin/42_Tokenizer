pragma solidity ^0.8.20;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "forge-std/console.sol";

import {DataConsumerV3} from "src/DataConsumerV3.sol";

contract GrillzFarm42 is ERC721URIStorage, DataConsumerV3, Ownable {

    uint256 USD_FARM_PRICE = 20; // in USD

    uint256 private _nextTokenId;

    struct Farm {
        address owner;
        string name;
        int64 latitude;
        int64 longitude;
        uint256 buildTime;
    }

    uint256[] farmsIds;

    mapping(uint256 => Farm) public farms;
    mapping(address => uint256) public ownerFarmCount;
    mapping(address => bool) public goldFarmers;

    address public grzContractAddress;

    event BuildFarm(address indexed owner, uint256 tokenId, uint256 buildTime, int64 latitude, int64 longitude, string farmName);
    event Mint(address indexed owner, string IPFSUrl);


    constructor() ERC721("grzFarm42", "GRZF") Ownable(msg.sender) {}

    function buildFarm(int64 latitude, int64 longitude, string memory farmName) public payable returns (uint256) {

        string memory farmTokenURI = "ipfs://bafkreiexcavf7qnurhuh323gdk6nbe3sgpatzitwlw6huaojqfqpmk2iuq";

        uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());

        uint256 farmPrice = USD_FARM_PRICE * 1e8;
        uint weiFarmPrice = uint256((1e18 * farmPrice) / ethPrice);

        require(msg.value >= weiFarmPrice, "money problem");

        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, farmTokenURI);

        console.log("Farm #", tokenId, " owner:", msg.sender, " farmName: ", farmName, " latitude: ", latitude, " longitude: ", longitude, " buildTime: ", block.timestamp);
        farms[tokenId] = Farm(msg.sender, farmName, latitude, longitude, block.timestamp);
        farmsIds.push(tokenId);
        ownerFarmCount[msg.sender] += 1;

        emit BuildFarm(msg.sender, tokenId, block.timestamp, latitude, longitude, farmName);
        emit Mint(msg.sender, farmTokenURI);

        return tokenId;
    }

    function withdraw() public onlyOwner {
        address payable owner = payable(owner());
        owner.transfer(address(this).balance);
    }

    function setMinter(address _grzContractAddress) public onlyOwner {
        require(_grzContractAddress != address(0), "new Grz Contract address can't be null");
        grzContractAddress = _grzContractAddress;
    }

    function mintGoldCricket(address _to) public {

        string memory goldCricketURI = "ipfs://bafkreifyz3wwdgezqtlvac3zc4n6sps76pnpa6wtjr6hjrl7bmy6gipsre";

        require(grzContractAddress != address(0), "Address of GRZ contract is not set yet!");
        require(msg.sender == grzContractAddress, "You can't mint!");
        require(_to != address(0));

        uint tokenId = _nextTokenId++;

        _mint(_to, tokenId);
        _setTokenURI(tokenId, goldCricketURI);

        goldFarmers[_to] = true;

        emit Mint(_to, goldCricketURI);
    }

    function isGoldFarmer(address farmer) public view returns (bool) {
        return goldFarmers[farmer];
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {

        address from = super._update(to, tokenId, auth);

        if (from != address(0)){
            ownerFarmCount[from] -= 1;
            ownerFarmCount[to] += 1;
            farms[tokenId].owner = to;
        }

        return from;
    }

    function getFarmsIds() public view returns (uint256[] memory){
        return farmsIds;
    }

    function getFarm(uint256 tokenId) public view returns(Farm memory){
        return farms[tokenId];
    }

    function setFarmPrice(uint256 newFarmPrice) public onlyOwner {
        USD_FARM_PRICE = newFarmPrice;
    }
}
