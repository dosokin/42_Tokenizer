//// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Grillz42} from "../code/Grillz42.sol";
import {GrillzFarm42} from "../code/GrillzFarm42.sol";

contract GrillzScript is Script {

    GrillzFarm42 public grillzFarm42;
    Grillz42 public grillz42;

    function setUp() public {

    }

    function run() public {
        vm.startBroadcast();

        grillzFarm42 = new GrillzFarm42();

        grillz42 = new Grillz42(address(grillzFarm42));

        grillzFarm42.setMinter(address(grillz42));

        vm.stopBroadcast();
    }
}
