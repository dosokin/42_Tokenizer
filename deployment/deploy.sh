source .env

forge script --chain sepolia  Grillz.s.sol:GrillzScript --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify