source .env

export PATH="$PATH:/home/dosokin/.foundry/bin"

curl --create-dirs -o ../lib/chainlink/interfaces/AggregatorV3Interface.sol https://raw.githubusercontent.com/smartcontractkit/chainlink-evm/refs/heads/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol

forge install OpenZeppelin/openzeppelin-contracts

forge script --chain sepolia  Grillz.s.sol:GrillzScript --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify --broadcast