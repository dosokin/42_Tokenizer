source .env

curl --create-dirs -o ../lib/chainlink/interfaces/AggregatorV3Interface.sol https://raw.githubusercontent.com/smartcontractkit/chainlink-evm/refs/heads/develop/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol

~/.foundry/bin/forge install OpenZeppelin/openzeppelin-contracts

~/.foundry/bin/forge script --chain sepolia  Grillz.s.sol:GrillzScript --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY # --verify --broadcast
